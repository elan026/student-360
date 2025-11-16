import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Loader2 } from 'lucide-react';
import { getAllStudents, searchStudents } from '@/integrations/supabase/studentImport';

interface Student {
  id: string;
  name: string;
  email: string;
  totalAchievements: number;
  verifiedAchievements: number;
}

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllStudents();
        setStudents(data);
      } catch (err) {
        console.error('Error loading students:', err);
        setError('Failed to load students');
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (err) {
        console.error('Error loading students:', err);
        setError('Failed to load students');
      }
    } else {
      try {
        const results = await searchStudents(value);
        setStudents(results);
      } catch (err) {
        console.error('Error searching students:', err);
        setError('Search failed');
      }
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full sm:w-1/3 mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-8"
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2">Loading students...</span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Achievements</TableHead>
                <TableHead>Verified Achievements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-4">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map(student => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.totalAchievements}</TableCell>
                    <TableCell>{student.verifiedAchievements}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ManageStudents;
