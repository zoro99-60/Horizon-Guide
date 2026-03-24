"use client"

import { useState } from "react"
import { skillsChecklist as initialChecklist } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function SkillsChecklist() {
  const [checklist, setChecklist] = useState(initialChecklist)

  const toggleSkill = (catIndex: number, itemIndex: number) => {
    setChecklist((prev) =>
      prev.map((cat, ci) =>
        ci === catIndex
          ? {
              ...cat,
              items: cat.items.map((item, ii) =>
                ii === itemIndex ? { ...item, completed: !item.completed } : item
              ),
            }
          : cat
      )
    )
  }

  return (
    <Card className="border bg-card">
      <CardHeader>
        <CardTitle className="text-base">Skills Checklist</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {checklist.map((category, catIndex) => {
          const completed = category.items.filter((i) => i.completed).length
          return (
            <div key={category.category}>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">
                  {category.category}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {completed}/{category.items.length}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {category.items.map((item, itemIndex) => (
                  <label
                    key={item.name}
                    className="flex cursor-pointer items-center gap-3 rounded-md border border-border px-3 py-2.5 transition-colors hover:bg-accent has-[[data-state=checked]]:border-primary/20 has-[[data-state=checked]]:bg-primary/5"
                  >
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleSkill(catIndex, itemIndex)}
                    />
                    <span
                      className={`text-sm ${
                        item.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {item.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
