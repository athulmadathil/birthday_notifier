'use client';

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { people } from "@/lib/data";
import { BarChart, Upload, UserPlus } from "lucide-react";
import { useState } from "react";
import { DataTable } from "./components/data-table";
import { BirthdayChart } from "./components/birthday-chart";
import { AddDataForm } from "./components/add-data-form";
import { UploadForm } from "./components/upload-form";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get today's birthdays
  const today = new Date();
  const todayBirthdays = people.filter(person => {
    const dob = new Date(person.dateOfBirth);
    return dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth();
  });

  // Calculate past and upcoming birthdays
  const pastBirthdays = people.filter(person => {
    const dob = new Date(person.dateOfBirth);
    const thisYearBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    return thisYearBirthday < today;
  }).length;

  const upcomingBirthdays = people.filter(person => {
    const dob = new Date(person.dateOfBirth);
    const thisYearBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    return thisYearBirthday > today;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Data
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Add Birthday Data</SheetTitle>
              <SheetDescription>
                Add birthday data manually or upload an Excel file.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                </TabsList>
                <TabsContent value="manual">
                  <AddDataForm onSuccess={() => setIsOpen(false)} />
                </TabsContent>
                <TabsContent value="upload">
                  <UploadForm onSuccess={() => setIsOpen(false)} />
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Today's Birthdays</h3>
          </div>
          <div className="text-2xl font-bold">{todayBirthdays.length}</div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Past Birthdays</h3>
          </div>
          <div className="text-2xl font-bold">{pastBirthdays}</div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Upcoming Birthdays</h3>
          </div>
          <div className="text-2xl font-bold">{upcomingBirthdays}</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="tracking-tight text-lg font-medium">Birthday Distribution</h3>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 h-[200px]">
            <BirthdayChart />
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <h3 className="tracking-tight text-lg font-medium">Today's Birthdays</h3>
          </div>
          <DataTable data={todayBirthdays} />
        </div>
      </div>
    </div>
  );
} 