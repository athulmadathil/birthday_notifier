'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
}

const defaultTemplates: Template[] = [
  {
    id: "1",
    name: "Default Birthday Wish",
    subject: "Happy Birthday, {{name}}! 🎉",
    content: `Dear {{name}},

Wishing you a fantastic birthday filled with joy and laughter! 🎂

Best regards,
{{fromName}}`,
  },
  {
    id: "2",
    name: "Team Birthday Announcement",
    subject: "Birthday Celebration: {{name}} 🎈",
    content: `Hey Team!

Today is {{name}}'s birthday from the {{department}} department! 
Let's wish them a great day! 🎉

Best regards,
{{fromName}}`,
  },
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedSubject, setEditedSubject] = useState("");

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setEditedContent(template.content);
    setEditedSubject(template.subject);
  };

  const handleSave = () => {
    if (!selectedTemplate) return;

    const updatedTemplates = templates.map((t) =>
      t.id === selectedTemplate.id
        ? { ...t, content: editedContent, subject: editedSubject }
        : t
    );

    setTemplates(updatedTemplates);
    toast.success("Template updated successfully!");
    setSelectedTemplate(null);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Email Templates</h1>
        <p className="text-muted-foreground mt-2">
          Manage your email templates for birthday notifications.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>Subject: {template.subject}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                {template.content}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button onClick={() => handleEdit(template)} variant="outline">
                    Edit Template
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Edit Template</SheetTitle>
                    <SheetDescription>
                      Make changes to your email template here. Click save when you're done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Textarea
                        placeholder="Email subject"
                        value={editedSubject}
                        onChange={(e) => setEditedSubject(e.target.value)}
                        className="h-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content</label>
                      <Textarea
                        placeholder="Email content"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="h-72"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Available variables:
                        <br />
                        {'{'}{'{'}<span>name</span>{'}'}{'}'}  - Recipient's name
                        <br />
                        {'{'}{'{'}<span>department</span>{'}'}{'}'}  - Recipient's department
                        <br />
                        {'{'}{'{'}<span>fromName</span>{'}'}{'}'}  - Sender's name
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save changes</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 