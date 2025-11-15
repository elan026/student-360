
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  totalAchievements: number;
  verifiedAchievements: number;
}

// Mock data for student list
const mockStudents: Student[] = [
  {
    id: 'ST001',
    name: 'Viswanathan Anand',
    email: 'viswanathan.anand@example.com',
    totalAchievements: 40,
    verifiedAchievements: 32,
  },
  {
    id: 'ST002',
    name: 'Sundar Pichai',
    email: 'sundar.pichai@example.com',
    totalAchievements: 35,
    verifiedAchievements: 28,
  },
  {
    id: 'ST003',
    name: 'A. P. J. Abdul Kalam',
    email: 'apj.abdul.kalam@example.com',
    totalAchievements: 30,
    verifiedAchievements: 25,
  },
  {
    id: 'ST004',
    name: 'Kamal Haasan',
    email: 'kamal.haasan@example.com',
    totalAchievements: 28,
    verifiedAchievements: 21,
  },
  {
    id: 'ST005',
    name: 'Rajinikanth',
    email: 'rajinikanth@example.com',
    totalAchievements: 25,
    verifiedAchievements: 18,
  },
];

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search by student name..."
            className="pl-8"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
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
            {filteredStudents.map(student => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.totalAchievements}</TableCell>
                <TableCell>{student.verifiedAchievements}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ManageStudents;
