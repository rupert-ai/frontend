import { SvgCaretDownSmall } from "@itwin/itwinui-icons-react";
import { Button, DropdownMenu, DropdownMenuProps } from "@itwin/itwinui-react";
import "./BreadcrumbItem.scss";

type BreadcrumbItemProps = {
  menuItems: DropdownMenuProps["menuItems"];
  currentItem?: string;
  label: string;
};
function BreadcrumbItem({
  menuItems,
  currentItem,
  label,
}: BreadcrumbItemProps) {
  return (
    <span>
      {label}:
      <DropdownMenu menuItems={menuItems} className="dropdown-menu">
        <Button
          styleType="borderless"
          size="small"
          endIcon={<SvgCaretDownSmall />}
          className="dropdown-button"
        >
          {currentItem ?? "All"}
        </Button>
      </DropdownMenu>
    </span>
  );
}

export default BreadcrumbItem;
