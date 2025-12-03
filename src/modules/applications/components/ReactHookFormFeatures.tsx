import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

function ApplicationForm() {
  const form = useForm<FormValues>({
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1/"
    //   );
    //   const data = await response.json();

    //   return {
    //     username: "Batman",
    //     email: data.email,
    //     channel: "",
    //   };
    // },
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    mode: "onSubmit", // this is the default
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const {
    errors,
    isDirty,
    isValid,
    submitCount,
    isSubmitting,
    isSubmitSuccessful,
  } = formState;
  // console.log(isSubmitting);
  // console.log(isSubmitted);
  // console.log(isSubmitSuccessful);
  console.log(submitCount);
  // const {  touchedFields, dirtyFields, isDirty } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control: control,
  });
  // console.log("Touched, dirty:", touchedFields, dirtyFields, isDirty);
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const handleGetValues = () => {
    console.log("Get values", getValues("social.facebook"));
  };

  const handleSetValues = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };

  const watchForm = watch();

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  renderCount++;

  return (
    <div>
      <h1>Youtube form ({renderCount / 2})</h1>
      <h2>Watched value: {JSON.stringify(watchForm)}</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className='mb-5'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
            className='block border border-blue-200'
          />
          <p className='text-red-500'>{errors.username?.message}</p>
        </div>
        <div className='mb-5'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            {...register("email", {
              pattern: {
                value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different  email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already exists";
                },
              },
            })}
            className='block border border-blue-200'
          />
          <p className='text-red-500'>{errors.email?.message}</p>
        </div>
        <div className='mb-5'>
          <label htmlFor='channel'>Channel</label>
          <input
            type='text'
            id='channel'
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
            className='block border border-blue-200'
          />
          <p className='text-red-500'>{errors.channel?.message}</p>
        </div>
        <div className='mb-5'>
          <label htmlFor='twitter'>Twitter</label>
          <input
            type='text'
            id='twitter'
            {...register("social.twitter", {
              disabled: watch("channel") === "",
            })}
            className='block border border-blue-200'
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='facebook'>Facebook</label>
          <input
            type='text'
            id='facebook'
            {...register("social.facebook", {
              required: {
                value: true,
                message: "Facebook profile is required",
              },
            })}
            className='block border border-blue-200'
          />
          <p className='text-red-500'>{errors.social?.facebook?.message}</p>
        </div>
        <div className='mb-5'>
          <label htmlFor='primary-phone'>Primary phone</label>
          <input
            type='text'
            id='primary-phone'
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Primary phone number is required",
              },
            })}
            className='block border border-blue-200'
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='secondary-phone'>Secondary phone</label>
          <input
            type='text'
            id='secondary-phone'
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "Secondary phone number is required",
              },
            })}
            className='block border border-blue-200'
          />
        </div>
        <div>
          <label htmlFor=''>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className='mb-5' key={field.id}>
                  <input
                    type='text'
                    {...register(`phNumbers.${index}.number` as const)}
                    className='block border border-blue-200'
                  />
                  {index > 0 && (
                    <button type='button' onClick={() => remove(index)}>
                      Remove phone number
                    </button>
                  )}
                </div>
              );
            })}
            <button type='button' onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>
        <div className='mb-5'>
          <label htmlFor='age'>Age</label>
          <input
            type='number'
            id='age'
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
            className='block border border-blue-200'
          />
          <p className='text-red-500'>{errors.age?.message}</p>
        </div>
        <div className='mb-5'>
          <label htmlFor='dob'>Date of birth</label>
          <input
            type='date'
            id='dob'
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
            className='block border border-blue-200'
          />
          <p className='text-red-500'>{errors.dob?.message}</p>
        </div>
        <div className='flex items-center justify-start gap-4'>
          <button
            type='submit'
            className='bg-blue-900 text-white px-2 py-1 mt-3 disabled:bg-gray-500 '
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Submit
          </button>
          <button
            type='button'
            className='block bg-red-500 text-white px-2 py-1 mt-3'
            onClick={() => reset()}
          >
            Reset
          </button>
          <button
            type='button'
            className='block bg-green-900 text-white px-2 py-1 mt-3'
            onClick={handleGetValues}
          >
            Get values
          </button>
          <button
            type='button'
            className='block bg-green-900 text-white px-2 py-1 mt-3'
            onClick={handleSetValues}
          >
            Set value
          </button>
          <button
            type='button'
            onClick={() => trigger("channel")}
            className='block bg-blue-400 text-white px-2 py-1 mt-3'
          >
            Validate
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default ApplicationForm;
