"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts"

const waterData = [
  { name: "Consumido", value: 2.5, fill: "hsl(var(--chart-1))" },
  { name: "Restante", value: 0.5, fill: "hsl(var(--muted))" },
]

const macroData = [
  { name: "Proteína", short: "P", value: 120, max: 150, fill: "hsl(var(--chart-1))" },
  { name: "Carboidratos", short: "C", value: 250, max: 300, fill: "hsl(var(--chart-2))" },
  { name: "Gorduras", short: "G", value: 65, max: 70, fill: "hsl(var(--chart-3))" },
]

const microData = [
  { nutrient: "Vit C", value: 85, meta: 90, fill: "hsl(var(--chart-1))" },
  { nutrient: "Vit D", value: 15, meta: 20, fill: "hsl(var(--chart-2))" },
  { nutrient: "Ferro", value: 14, meta: 18, fill: "hsl(var(--chart-3))" },
  { nutrient: "Cálcio", value: 850, meta: 1000, fill: "hsl(var(--chart-4))" },
  { nutrient: "Mag", value: 300, meta: 400, fill: "hsl(var(--chart-5))" },
]

export default function NutritionDashboard() {
  return (
    <div className="grid gap-3 md:grid-cols-3 w-full">
      {/* Card de Água */}
      <Card className="w-2/5 aspect-square flex flex-col gap-4 items-center justify-center">
        <CardHeader className="pb-2 pt-2 px-4 ">
          <CardTitle className="text-center font-semibold">Água</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 px-4">
          <div className="relative">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={waterData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {waterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold">2.5L</p>
              <p className="text-sm text-muted-foreground">de 3.0L</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base font-semibold">Calorias & Macros</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 px-4">
          <div className="space-y-3">
            {/* Calorias */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Calorias</span>
              <span className="text-sm font-semibold">1,850 / 2,000 kcal</span>
            </div>

            {/* Macros em grid */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {macroData.map((macro) => {
                const percentage = (macro.value / macro.max) * 100
                return (
                  <div key={macro.name} className="flex flex-col items-center gap-1">
                    <div className="relative">
                      <svg width="60" height="60" className="transform -rotate-90">
                        <circle cx="30" cy="30" r="24" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          fill="none"
                          stroke={macro.fill}
                          strokeWidth="6"
                          strokeDasharray={`${2 * Math.PI * 24}`}
                          strokeDashoffset={`${2 * Math.PI * 24 * (1 - percentage / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold">{macro.value}g</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium">{macro.short}</p>
                      <p className="text-[10px] text-muted-foreground">{macro.max}g</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de Micronutrientes */}
      <Card>
        <CardHeader className="pb-1 pt-3 px-4">
          <CardTitle className="flex items-center gap-1.5 text-sm font-medium">
            <Pill className="h-3.5 w-3.5 text-chart-2" />
            Micronutrientes
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3 px-4">
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={microData} layout="vertical" margin={{ left: 0, right: 15 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="nutrient" tick={{ fontSize: 10 }} width={45} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <p className="text-xs font-medium">{data.nutrient}</p>
                        <p className="text-xs text-muted-foreground">
                          {data.value} / {data.meta}{" "}
                          {data.nutrient.includes("Cálcio") || data.nutrient.includes("Mag") ? "mg" : "mcg"}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
