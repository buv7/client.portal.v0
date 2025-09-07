"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Mail, Share2 } from "lucide-react"
import type { ProgressEntry } from "./progress-tracker"

interface ExportProgressProps {
  data: ProgressEntry[]
}

export function ExportProgress({ data }: ExportProgressProps) {
  const [exportOptions, setExportOptions] = useState({
    includePhotos: true,
    includeWeight: true,
    includeMeasurements: true,
    includeNotes: true,
    dateRange: "all",
  })
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    setIsExporting(true)
    // Simulate PDF generation
    setTimeout(() => {
      setIsExporting(false)
      // In a real app, this would generate and download a PDF
      console.log("PDF exported with options:", exportOptions)
    }, 2000)
  }

  const handleEmailExport = () => {
    // In a real app, this would open email client or send email
    console.log("Email export initiated")
  }

  const handleShare = () => {
    // In a real app, this would open share dialog
    console.log("Share initiated")
  }

  const filteredData = data.filter((entry) => {
    if (exportOptions.dateRange === "all") return true

    const now = new Date()
    const entryDate = new Date(entry.date)

    switch (exportOptions.dateRange) {
      case "last30":
        return now.getTime() - entryDate.getTime() <= 30 * 24 * 60 * 60 * 1000
      case "last90":
        return now.getTime() - entryDate.getTime() <= 90 * 24 * 60 * 60 * 1000
      case "thisYear":
        return entryDate.getFullYear() === now.getFullYear()
      default:
        return true
    }
  })

  const getDataSummary = () => {
    const totalEntries = filteredData.length
    const entriesWithPhotos = filteredData.filter((e) => e.photos.front || e.photos.side || e.photos.back).length
    const entriesWithWeight = filteredData.filter((e) => e.weight).length
    const entriesWithMeasurements = filteredData.filter((e) => Object.values(e.measurements).some(Boolean)).length

    return {
      totalEntries,
      entriesWithPhotos,
      entriesWithWeight,
      entriesWithMeasurements,
    }
  }

  const summary = getDataSummary()

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Range */}
          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select
              value={exportOptions.dateRange}
              onValueChange={(value) => setExportOptions((prev) => ({ ...prev, dateRange: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last90">Last 90 Days</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Include Options */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Include in Export</Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="photos"
                  checked={exportOptions.includePhotos}
                  onCheckedChange={(checked) => setExportOptions((prev) => ({ ...prev, includePhotos: !!checked }))}
                />
                <Label htmlFor="photos">Progress Photos</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weight"
                  checked={exportOptions.includeWeight}
                  onCheckedChange={(checked) => setExportOptions((prev) => ({ ...prev, includeWeight: !!checked }))}
                />
                <Label htmlFor="weight">Weight Data</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="measurements"
                  checked={exportOptions.includeMeasurements}
                  onCheckedChange={(checked) =>
                    setExportOptions((prev) => ({ ...prev, includeMeasurements: !!checked }))
                  }
                />
                <Label htmlFor="measurements">Body Measurements</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notes"
                  checked={exportOptions.includeNotes}
                  onCheckedChange={(checked) => setExportOptions((prev) => ({ ...prev, includeNotes: !!checked }))}
                />
                <Label htmlFor="notes">Notes & Comments</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Export Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{summary.totalEntries}</div>
              <div className="text-sm text-muted-foreground">Total Entries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{summary.entriesWithPhotos}</div>
              <div className="text-sm text-muted-foreground">With Photos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{summary.entriesWithWeight}</div>
              <div className="text-sm text-muted-foreground">With Weight</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{summary.entriesWithMeasurements}</div>
              <div className="text-sm text-muted-foreground">With Measurements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Export Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleExportPDF}
            disabled={isExporting || summary.totalEntries === 0}
            className="w-full gap-2"
          >
            <FileText className="h-4 w-4" />
            {isExporting ? "Generating PDF..." : "Export as PDF"}
          </Button>

          <Button
            variant="outline"
            onClick={handleEmailExport}
            disabled={summary.totalEntries === 0}
            className="w-full gap-2 bg-transparent"
          >
            <Mail className="h-4 w-4" />
            Email Progress Report
          </Button>

          <Button
            variant="outline"
            onClick={handleShare}
            disabled={summary.totalEntries === 0}
            className="w-full gap-2 bg-transparent"
          >
            <Share2 className="h-4 w-4" />
            Share Progress
          </Button>
        </CardContent>
      </Card>

      {/* Export Preview */}
      {summary.totalEntries > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Your export will include {summary.totalEntries} progress entries from{" "}
                {exportOptions.dateRange === "all"
                  ? "all time"
                  : exportOptions.dateRange === "last30"
                    ? "the last 30 days"
                    : exportOptions.dateRange === "last90"
                      ? "the last 90 days"
                      : "this year"}
                .
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-medium">Included Data:</div>
                  <ul className="space-y-1 text-muted-foreground">
                    {exportOptions.includePhotos && <li>• Progress photos</li>}
                    {exportOptions.includeWeight && <li>• Weight measurements</li>}
                    {exportOptions.includeMeasurements && <li>• Body measurements</li>}
                    {exportOptions.includeNotes && <li>• Notes and comments</li>}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">Date Range:</div>
                  <div className="text-muted-foreground">
                    {filteredData.length > 0 && (
                      <>
                        {new Date(Math.min(...filteredData.map((e) => e.date.getTime()))).toLocaleDateString()} -{" "}
                        {new Date(Math.max(...filteredData.map((e) => e.date.getTime()))).toLocaleDateString()}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
