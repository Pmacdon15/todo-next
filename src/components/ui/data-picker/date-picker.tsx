'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function DatePicker({ callback }: { callback: (value: Date) => void }) {
	const [date, setDate] = React.useState<Date>()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className={cn(
						'w-[240px] justify-start text-left font-normal',
						!date && 'text-muted-foreground',
					)}
					variant={'outline'}
				>
					<CalendarIcon />
					{date ? format(date, 'PPP') : <span>Pick a due date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-auto p-0">
				<Calendar
					initialFocus
					mode="single"
					onSelect={(date) => {
						setDate(date)
						if (date) callback(date)
					}}
					selected={date}
				/>
			</PopoverContent>
		</Popover>
	)
}
