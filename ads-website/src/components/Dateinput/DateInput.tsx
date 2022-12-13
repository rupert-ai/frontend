import { DatePicker, LabeledInput } from "@itwin/itwinui-react";
import { SvgCalendar } from "@itwin/itwinui-icons-react";
import { Popover } from "@itwin/itwinui-react/esm/core/utils";

interface DateInputProps {
  onChange: (val: Date) => void;
  value: Date;
  className?: string;
}

const DateInput = ({ onChange, value, className }: DateInputProps) => {
  return (
    <Popover
      content={
        <DatePicker
          date={value}
          onChange={(value) => value && onChange(value)}
        />
      }
      trigger="click"
    >
      <LabeledInput
        displayStyle="inline"
        iconDisplayStyle="inline"
        svgIcon={<SvgCalendar />}
        readOnly
        value={value.toDateString()}
        className={className}
      />
    </Popover>
  );
};

export default DateInput;
