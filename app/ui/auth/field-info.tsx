import { FieldApi } from "@tanstack/react-form";
import { MdError } from "react-icons/md";

export default function FieldInfo({
  field,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
}) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors?.length ? (
        <span className={`form-error-text flex gap-2 items-start`}>
          <MdError />{" "}
          <span className="flex-1">{field.state.meta.errors.join(", ")}</span>
        </span>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
