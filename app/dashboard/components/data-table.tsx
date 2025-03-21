'use client';

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Person } from "@/lib/data";
import { Mail } from "lucide-react";
import { toast } from "sonner";

interface DataTableProps {
  data: Person[];
}

export function DataTable({ data }: DataTableProps) {
  const sendWishes = async () => {
    // In a real app, this would send API requests
    toast.success("Birthday wishes sent successfully!");
  };

  return (
    <div>
      {data.length > 0 && (
        <div className="p-4 border-t">
          <Button onClick={sendWishes} variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Send Wishes to All
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No birthdays today
              </TableCell>
            </TableRow>
          ) : (
            data.map((person) => (
              <TableRow key={person.id}>
                <TableCell className="font-medium">{person.name}</TableCell>
                <TableCell className="capitalize">{person.role}</TableCell>
                <TableCell>{person.department}</TableCell>
                <TableCell>{person.email}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 