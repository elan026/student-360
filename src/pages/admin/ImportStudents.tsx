import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { importStudents } from '@/integrations/supabase/studentImport';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ImportStudents = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null);
  const [csvContent, setCsvContent] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const text = await selectedFile.text();
      setCsvContent(text);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!csvContent) {
      alert('Please select a CSV file');
      return;
    }

    try {
      setLoading(true);
      const importResult = await importStudents(csvContent);
      setResult(importResult);
    } catch (error) {
      console.error('Error importing students:', error);
      setResult({
        success: 0,
        failed: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error occurred'],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Import Students</CardTitle>
          <CardDescription>
            Upload a CSV file with student data to import into the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">CSV Format</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Your CSV file should have the following columns (in order):
            </p>
            <code className="block bg-muted p-3 rounded-md text-xs overflow-x-auto mb-4">
              student_id,name,register_no,department,year,section,email,phone
            </code>
            <p className="text-sm text-muted-foreground">
              Example row:
              <code className="block bg-muted p-2 rounded mt-1 text-xs">
                STU001,Lavanya L,21AIDS001,AI&DS,4,B,lavanya1@college.edu,9227208176
              </code>
            </p>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-6">
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <label className="cursor-pointer">
                <span className="font-medium text-primary hover:underline">
                  Click to upload
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                or drag and drop your CSV file
              </p>
              {file && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {file.name} selected
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={handleImport}
            disabled={!file || loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              'Import Students'
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Import Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.success > 0 && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Successfully imported {result.success} student{result.success !== 1 ? 's' : ''}
                </AlertDescription>
              </Alert>
            )}

            {result.failed > 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Failed to import {result.failed} student{result.failed !== 1 ? 's' : ''}
                </AlertDescription>
              </Alert>
            )}

            {result.errors.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Errors:</h4>
                <div className="space-y-2">
                  {result.errors.map((error, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground bg-muted p-2 rounded">
                      {error}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Total Successful</p>
                <p className="text-2xl font-bold text-green-600">{result.success}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Failed</p>
                <p className="text-2xl font-bold text-red-600">{result.failed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImportStudents;
