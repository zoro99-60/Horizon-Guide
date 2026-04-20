import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface QuestionCardProps {
  question: string
  options: { text: string }[]
  selectedOption: number | null
  onSelectOption: (index: number) => void
  onNext: () => void
  onPrevious: () => void
  isFirst: boolean
  isLast: boolean
}

export function QuestionCard({
  question,
  options,
  selectedOption,
  onSelectOption,
  onNext,
  onPrevious,
  isFirst,
  isLast
}: QuestionCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-heading">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectOption(index)}
              className={`w-full p-4 rounded-lg border text-left transition-all ${
                selectedOption === index
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedOption === index
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}
                >
                  {selectedOption === index && (
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <span className={selectedOption === index ? 'text-foreground' : ''}>
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={onPrevious}
            disabled={isFirst}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={selectedOption === null}
            className="bg-primary hover:bg-primary/90"
          >
            {isLast ? 'See Results' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
