import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, BarChart3 } from 'lucide-react';

const AdminReports = () => {
  const reports = [
    {
      id: 1,
      name: 'Student Achievement Summary',
      description: 'Overview of all student achievements and verification status',
      icon: BarChart3,
    },
    {
      id: 2,
      name: 'Faculty Performance Report',
      description: 'Metrics on faculty verification activities',
      icon: FileText,
    },
    {
      id: 3,
      name: 'System Analytics',
      description: 'Platform usage statistics and trends',
      icon: BarChart3,
    },
  ];

  const handleGenerateReport = (reportName: string) => {
    alert(`Report generation for "${reportName}" coming soon!`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>
            Generate and download various system reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => {
              const IconComponent = report.icon;
              return (
                <div key={report.id} className="border rounded-lg p-4 hover:bg-muted transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <IconComponent className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleGenerateReport(report.name)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;
