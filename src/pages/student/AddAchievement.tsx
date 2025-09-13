import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Upload, 
  X,
  Trophy,
  ArrowLeft,
  Save,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

interface AchievementForm {
  title: string;
  category: string;
  date: string;
  description: string;
  documents: File[];
}

const AddAchievement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<AchievementForm>({
    title: '',
    category: '',
    date: '',
    description: '',
    documents: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'academic', label: 'Academic', description: 'Course completions, grades, academic awards' },
    { value: 'cocurricular', label: 'Co-curricular', description: 'Competitions, clubs, student organizations' },
    { value: 'extracurricular', label: 'Extracurricular', description: 'Sports, arts, hobbies, personal interests' },
    { value: 'certification', label: 'Certification', description: 'Professional certifications, licenses' },
    { value: 'internship', label: 'Internship', description: 'Work experience, internships, job training' },
    { value: 'volunteering', label: 'Volunteering', description: 'Community service, social work' },
    { value: 'leadership', label: 'Leadership', description: 'Leadership roles, team management' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive"
        });
        return false;
      }
      return true;
    });

    if (form.documents.length + validFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive"
      });
      return;
    }

    setForm(prev => ({
      ...prev,
      documents: [...prev.documents, ...validFiles]
    }));
  };

  const removeFile = (index: number) => {
    setForm(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.category || !form.date || !form.description) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Achievement submitted!",
      description: "Your achievement has been submitted for faculty review"
    });
    
    setIsSubmitting(false);
    navigate('/student/achievements');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      academic: 'border-academic bg-academic/5',
      cocurricular: 'border-cocurricular bg-cocurricular/5',
      extracurricular: 'border-extracurricular bg-extracurricular/5',
      certification: 'border-certification bg-certification/5',
      internship: 'border-internship bg-internship/5',
      volunteering: 'border-volunteering bg-volunteering/5',
      leadership: 'border-leadership bg-leadership/5'
    };
    return colors[category] || '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link to="/student/achievements">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Plus className="h-6 w-6" />
            Add New Achievement
          </h1>
          <p className="text-muted-foreground">Record your accomplishments for verification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Achievement Details</CardTitle>
              <CardDescription>
                Provide comprehensive information about your achievement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Achievement Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., First Place in Programming Competition"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={form.category} onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select achievement category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{category.label}</span>
                          <span className="text-xs text-muted-foreground">{category.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Achievement Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of your achievement, including context, your role, and outcomes..."
                  rows={5}
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Include specific details that will help faculty verify your achievement
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Supporting Documents
              </CardTitle>
              <CardDescription>
                Upload certificates, photos, or other proof of your achievement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="font-medium">Upload Documents</p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Max 5 files, up to 10MB each
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {form.documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Uploaded Files</h4>
                  {form.documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category Preview */}
          {form.category && (
            <Card className={`shadow-card ${getCategoryColor(form.category)}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5" />
                  <h3 className="font-semibold">
                    {categories.find(c => c.value === form.category)?.label}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {categories.find(c => c.value === form.category)?.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Submission Guidelines */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Required Information:</h4>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Clear and descriptive title</li>
                  <li>• Appropriate category selection</li>
                  <li>• Accurate achievement date</li>
                  <li>• Detailed description</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Supporting Documents:</h4>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• Certificates or awards</li>
                  <li>• Photos or screenshots</li>
                  <li>• Official letters</li>
                  <li>• Project documentation</li>
                </ul>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-xs">
                  <strong>Note:</strong> All submissions will be reviewed by faculty members. 
                  Ensure all information is accurate and verifiable.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Submit Achievement
                </>
              )}
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to="/student/achievements">
                Cancel
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAchievement;