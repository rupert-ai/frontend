import { SvgSearch } from "@itwin/itwinui-icons-react";
import { Button, LabeledInput } from "@itwin/itwinui-react";
import { useState } from "react";
import DateInput from "../Dateinput/DateInput";
import "./Toolbar.scss";

type ToolbarProps = {
  sets: string[];
};

function Toolbar() {
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  const [fromDate, setFromDate] = useState<Date>(monthAgo);
  const [toDate, setToDate] = useState<Date>(new Date());

  return (
    <div className="toolbar-container">
      <LabeledInput
        placeholder="Search by Name, Impressions, etc..."
        svgIcon={<SvgSearch />}
        iconDisplayStyle="inline"
        style={{ width: "50%" }}
      />
      <span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <DateInput
            value={fromDate}
            onChange={setFromDate}
            className="date-input"
          />
          <DateInput
            value={toDate}
            onChange={setToDate}
            className="date-input"
          />
          <Button>Apply filter</Button>
        </div>
      </span>
    </div>
  );
}

export default Toolbar;
