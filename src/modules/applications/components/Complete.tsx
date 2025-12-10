import type { Inputs } from "../types";
import SummaryField from "./SummaryField";

function Complete({ data }: { data: Inputs | null }) {
  if (!data)
    return (
      <p className="">
        Din pacate datele tale nu au fost trimise. Te rugam sa incerci din nou!
      </p>
    );
  return (
    <div className="space-y-4">
      <h2 className="text-bold text-2xl">
        Îți mulțumim pentru aplicația ta! 🙂
      </h2>
      <p>Datele tale au fost trimise către un operator...</p>
      <h3 className="mt-6 text-xl font-semibold">Rezumat aplicație</h3>
      <div>
        <SummaryField label="Nume" value={data.nume} />
        <SummaryField label="Prenume" value={data.prenume} />
        <SummaryField label="CNP" value={data.cnp} />
        <SummaryField label="Telefon" value={data.telefon} />
        <SummaryField label="Adresa Email" value={data.adresaEmail} />
        <SummaryField
          label="Venit Lunar"
          value={`${data.venitLunar.toString()}RON`}
        />
        <SummaryField label="Angajator" value={data.angajator} />
        <SummaryField label="Ocupatie" value={data.ocupatie} />
        <SummaryField label="Tip produs" value={data.tipProdus} />
        <SummaryField
          label="Suma cerută"
          value={`${data.sumaCeruta.toString()}RON`}
        />
        <SummaryField label="Durata" value={`${data.durata.toString()} luni`} />
      </div>
      <h4 className="mt-4 text-lg font-semibold">Documente</h4>
      <p>Buletin: {data.buletin.name}</p>
      <p>Fluturaș salariu: {data.fluturasSalariu.name}</p>
    </div>
  );
}

export default Complete;
