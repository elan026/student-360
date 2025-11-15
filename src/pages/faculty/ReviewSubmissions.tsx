
import { useState, useEffect } from 'react';
import { Eye, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { getAchievements } from '@/integrations/supabase/api';
import type { Achievement } from '@/integrations/supabase/types';

const ReviewSubmissions = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);
  const [filters, setFilters] = useState({ searchTerm: '', category: 'all', status: 'pending' });

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAchievements();
        setAchievements(data);
        setFilteredAchievements(data.filter(a => a.status === 'pending'));
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };
    fetchAchievements();
  }, []);

  useEffect(() => {
    let result = achievements;
    if (filters.searchTerm) {
      result = result.filter(a => a.title.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    }
    if (filters.category !== 'all') {
      result = result.filter(a => a.category === filters.category);
    }
    if (filters.status !== 'all') {
      result = result.filter(a => a.status === filters.status);
    }
    setFilteredAchievements(result);
  }, [filters, achievements]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title..." className="pl-8" onChange={e => handleFilterChange('searchTerm', e.target.value)} />
          </div>
          <Select onValueChange={value => handleFilterChange('category', value)} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="co-curricular">Co-curricular</SelectItem>
              <SelectItem value="extracurricular">Extracurricular</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={value => handleFilterChange('status', value)} defaultValue="pending">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAchievements.map(achievement => (
              <TableRow key={achievement.id}>
                <TableCell>{(achievement.student_id as any)?.name || 'N/A'}</TableCell>
                <TableCell>{achievement.title}</TableCell>
                <TableCell>{achievement.category}</TableCell>
                <TableCell><Badge>{achievement.status}</Badge></TableCell>
                <TableCell>{new Date(achievement.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/faculty/review/${achievement.id}`}>
                      <Eye className="mr-2 h-4 w-4" /> Review
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReviewSubmissions;
