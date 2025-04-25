"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import FieldInfo from "../auth/field-info";
import { EditUserInformationSchema, States, User } from "@/app/lib/definitions";
import { getAllStates, updateUser } from "@/app/lib/actions/user";
import { ADMIN_USERS } from "@/app/lib/routes";
import { toast } from "react-toastify";

export default function EditUserForm({ user }: { user: User }) {
  // const { editUser } = useAdminStore((state) => state);
  const [, setStates] = React.useState<States[] | null>([]);
  const [submitting, setSubmitting] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const response = await getAllStates();
      if (response.success) {
        setStates(response.result);
      }
    })();
  }, []);
  const router = useRouter();
  console.log(user);
  const form = useForm({
    defaultValues: {
      firstName: user.fullName.split(" ")[0],
      lastName: user.fullName.split(" ")[1],

      // phoneNumber: user.phoneNumber,
      email: user.emailAddress,
      // address: user.address,
      // state: user.state,
      dateOfBirth: "",
      // gender: user.gender,
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      console.log(values);

      try {
        const response = await updateUser({
          ...user,
          ...values.value,
          surname: values.value.lastName,
          fullName: values.value.firstName + " " + values.value.lastName,
          name: values.value.firstName,
        });
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
      } finally {
        setSubmitting(false);
      }
      // Handle form submission
      router.push(ADMIN_USERS.url);
    },
    validators: {
      onChange: EditUserInformationSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div
        className="
        flex flex-col bg-white md:p-8 rounded-3xl gap-6
        "
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="firstName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    First Name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    className={`form-input-field`}
                    onBlur={field.handleBlur}
                    placeholder="Enter your first name"
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="lastName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Last Name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    className={`form-input-field`}
                    value={field.state.value}
                    placeholder="Enter your last name"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        {/* <div>
          <form.Field name="phoneNumber">
            {(field) => (
              <>
                <label
                  className="block text-sm font-medium"
                  htmlFor={field.name}
                >
                  Phone Number
                </label>
                <PhoneInput
                  country={"ng"}
                  value={field.state.value}
                  onChange={(phone) => field.handleChange(phone)}
                  inputClass="!w-full !h-auto !p-2 !pl-14 !border !rounded focus:!outline-none focus:!ring-2 focus:!ring-blue-500"
                  containerClass="w-full"
                  buttonClass="!border-r-0 !rounded-l !p-2"
                  dropdownClass="!rounded"
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div> */}
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="email"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Email Address
                  </label>
                  <input
                    id={field.name}
                    className={`form-input-field`}
                    name={field.name}
                    value={field.state.value}
                    type="email"
                    placeholder="Enter your email address"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        {/* <div>
          <form.Field
            name="address"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Address
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    className={`form-input-field`}
                    placeholder="Enter your house address"
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div> */}
        {/* <div>
          <form.Field
            name="state"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    State
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`form-input-field`}
                  >
                    <option value="">Select your state</option>
                    {states?.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.stateName}
                      </option>
                    ))}
                  </select>

                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div> */}

        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="dateOfBirth"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Date Of Birth
                  </label>
                  <input
                    id={field.name}
                    type="date"
                    name={field.name}
                    value={field.state.value}
                    className={`form-input-field`}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        {/* <div>
          <form.Field
            name="gender"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label
                    className="block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    Gender
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    className={`form-input-field`}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div> */}

        <button
          type="submit"
          className="btn-primary mt-10"
          disabled={submitting}
        >
          Update
        </button>
      </div>
    </form>
  );
}
