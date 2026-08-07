import type { JSX } from "react";
import { CLASSNAMES, FILENAMES, format_resources_text, get_donation_border_filename, type Resource } from "./ResourceUtils";

export function resource_icon(res: Resource, is_donation: boolean): JSX.Element {
    const [resource_name, count] = res
    const classname = CLASSNAMES[resource_name];
    const filename = "assets/icons/" + FILENAMES[resource_name];
    const count_display = count > 1 ? count : "";
    const donation_border = is_donation ? <img className={"centered donation " + classname} src={get_donation_border_filename(resource_name)} /> : <></>;
    return <div className={"resource " + classname} key={`${resource_name}${is_donation}`}>
                {donation_border}
                <img className={"centered " + classname} src={filename} alt={format_resources_text(res, is_donation)} />
                <span className="centered">{count_display}</span>
            </div>; // whitespace here must be missing for correct arrow formatting
}
