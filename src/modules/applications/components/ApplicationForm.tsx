import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  ApplicationFormSchema,
  type FieldName,
  type Inputs,
  type Pas,
} from "../types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Complete from "./Complete";
import Consimtamant from "./Consimtamant";
import DateFinanciare from "./DateFinanciare";
import DatePersonale from "./DatePersonale";
import DetaliiCredit from "./DetaliiCredit";
import Documente from "./Documente";

const pasi: Pas[] = [
  {
    id: "Pasul 1",
    titlu: "Date personale",
    campuri: ["nume", "prenume", "cnp", "adresa", "adresaEmail", "telefon"],
  },
  {
    id: "Pasul 2",
    titlu: "Date financiare",
    campuri: ["venitLunar", "angajator", "ocupatie", "vechimeInMunca"],
  },
  {
    id: "Pasul 3",
    titlu: "Detalii credit",
    campuri: ["tipProdus", "sumaCeruta", "durata"],
  },
  {
    id: "Pasul 4",
    titlu: "Documente",
    campuri: ["buletin", "fluturasSalariu"],
  },
  {
    id: "Pasul 5",
    titlu: "Consimțământ",
    campuri: ["benerificarReal", "termeniSiConditii", "oferte"],
  },
  {
    id: "Pasul 6",
    titlu: "Completat",
  },
];

function ApplicationForm() {
  // const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [submittedData, setSubmittedData] = useState<Inputs | null>(null);
  // console.log(currentStep);
  // const delta = currentStep - previousStep;
  // console.log(delta);

  const form = useForm<Inputs>({
    defaultValues: {
      nume: "",
      prenume: "",
      cnp: "",
      adresa: {
        judet: "",
        localitate: "",
        adresa1: "",
        adresa2: "",
        codPostal: "",
      },
      adresaEmail: "",
      telefon: "",
      venitLunar: 0,
      angajator: "",
      vechimeInMunca: 1,
      ocupatie: "",
      tipProdus: "",
      sumaCeruta: 3000,
      durata: 6,
      buletin: undefined,
      fluturasSalariu: undefined,
      benerificarReal: false,
      termeniSiConditii: false,
      oferte: false,
    },

    resolver: zodResolver(ApplicationFormSchema),
  });

  const { register, handleSubmit, control, formState, trigger, watch } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setSubmittedData(data);
  };

  const next = async () => {
    const fields = pasi[currentStep].campuri;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    console.log(output);
    if (!output) return;

    if (currentStep < pasi.length - 1) {
      if (currentStep === pasi.length - 2) {
        console.log("Aici ar trebui sa se intample ceva");
        await handleSubmit(onSubmit)();
      }
      // setPreviousStep(currentStep);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      // setPreviousStep(currentStep);
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Card className="mx-auto mt-12 max-w-7xl shadow-lg">
      <CardHeader>
        <nav aria-label="Progress">
          <ol
            role="list"
            className="space-y-4 md:flex md:space-x-8 md:space-y-0"
          >
            {pasi.map((pas, index) => (
              <li key={pas.titlu} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex flex-col border-l-4 border-blue-600 py-2 pl-4 transition-colors md:border-b-4 md:border-l-0 md:pb-4 md:pl-0 md:pt-0">
                    <span className="mb-1 text-lg font-semibold text-blue-600">
                      {pas.id}
                    </span>
                    <span className="hidden text-xs text-slate-900 dark:text-slate-400 md:block">
                      {pas.titlu}
                    </span>
                  </div>
                ) : currentStep === index ? (
                  <div className="flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-b-4 md:border-l-0 md:pb-4 md:pl-0 md:pt-0">
                    <span className="mb-1 text-lg font-semibold text-blue-600">
                      {pas.id}
                    </span>
                    <span className="hidden text-xs text-slate-900 dark:text-slate-400 md:block">
                      {pas.titlu}
                    </span>
                  </div>
                ) : (
                  <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-b-4 md:border-l-0 md:pb-4 md:pl-0 md:pt-0">
                    <span className="mb-1 text-lg font-semibold text-slate-900 dark:text-white">
                      {pas.id}
                    </span>
                    <span className="hidden text-xs text-slate-600 dark:text-slate-400 md:block">
                      {pas.titlu}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </CardHeader>

      {/* formular */}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          {currentStep === 0 && (
            <DatePersonale register={register} errors={errors} />
          )}
          {currentStep === 1 && (
            <DateFinanciare register={register} errors={errors} />
          )}
          {currentStep === 2 && (
            <DetaliiCredit
              register={register}
              errors={errors}
              watch={watch}
              control={control}
            />
          )}
          {currentStep === 3 && (
            <Documente
              register={register}
              errors={errors}
              watch={watch}
              control={control}
            />
          )}
          {currentStep === 4 && (
            <Consimtamant
              register={register}
              errors={errors}
              control={control}
              watch={watch}
            />
          )}
          {currentStep === 5 && <Complete data={submittedData} />}
        </form>
      </CardContent>

      {/* Dev tool */}
      <DevTool control={control} />

      {/* butoane */}
      <CardFooter>
        <div className="mt-12 flex w-full justify-between">
          {currentStep !== 5 && (
            <>
              <Button
                variant="secondary"
                disabled={currentStep === 0}
                onClick={prev}
              >
                Pasul anterior
              </Button>
              <Button variant="default" onClick={next}>
                Pasul urmator
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default ApplicationForm;
