
import { DatePicker } from "@nextui-org/react"

export default function myAccountPage() {
    return(
        <div className="w-full max-w-xl flex flex-row gap-4">
        <DatePicker
          label="Event Date"
          variant="bordered"
          hideTimeZone
          showMonthAndYearPickers
        />
      </div>
    )
}