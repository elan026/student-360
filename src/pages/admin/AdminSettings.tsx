import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Save } from 'lucide-react';
import { useState } from 'react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    platformName: 'Student360',
    supportEmail: 'support@student360.edu',
    achievementCategories: 'academic,cocurricular,extracurricular,certification,internship',
    verificationRequired: 'true',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to the database
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Platform Settings
          </CardTitle>
          <CardDescription>
            Configure system-wide settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                placeholder="Enter platform name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                placeholder="Enter support email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationRequired">Require Verification</Label>
              <Select value={settings.verificationRequired} onValueChange={(value) => setSettings({ ...settings, verificationRequired: value })}>
                <SelectTrigger id="verificationRequired">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes, require faculty verification</SelectItem>
                  <SelectItem value="false">No, auto-approve achievements</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievementCategories">Achievement Categories</Label>
              <Input
                id="achievementCategories"
                value={settings.achievementCategories}
                onChange={(e) => setSettings({ ...settings, achievementCategories: e.target.value })}
                placeholder="Comma-separated categories"
              />
              <p className="text-xs text-muted-foreground">
                Separate categories with commas (e.g., academic, sports, leadership)
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            {saved && (
              <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md text-sm">
                ✓ Settings saved successfully
              </div>
            )}
            <Button onClick={handleSave} className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Platform Version:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Database Status:</span>
            <span className="font-medium text-green-600">Connected</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
