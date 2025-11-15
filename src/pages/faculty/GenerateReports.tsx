
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

const GenerateReports = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Reports</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p>A comprehensive report on the achievements and verification statistics for your department.</p>
            <Button className="mt-4">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Student Leaderboard Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p>A report ranking students in your department based on the number of verified achievements.</p>
            <Button className="mt-4">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default GenerateReports;
