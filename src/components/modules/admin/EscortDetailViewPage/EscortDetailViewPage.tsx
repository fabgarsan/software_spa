import React from "react";
import { InstancesDescriptorKeys, instancesDescriptor } from "@utils/index";
import { useReactQueryCRUDGenericApiCall } from "@api/reactQueryApi";
import { Services } from "./Services";
import { ImageList } from "./ImageList";
import { DetailViewGeneric } from "@components/shared";
import { Escort } from "@dto/escorts";
import { useParams } from "react-router-dom";
import { differenceInHours } from "date-fns";

const { escort: escortDescriptorKey } = InstancesDescriptorKeys;

const instanceDescriptorEscort = instancesDescriptor[escortDescriptorKey];

export const EscortDetailViewPage: React.FunctionComponent = () => {
  const { id: escortId } = useParams();

  const { useFetch: fetchEscort } =
    useReactQueryCRUDGenericApiCall<Escort>(escortDescriptorKey);

  const escortQuery = fetchEscort({ id: escortId || "" });
  const { data: escortData, isSuccess: escortQueryIsSuccess } = escortQuery;

  const attributes = escortQueryIsSuccess
    ? [
        { label: "Usuario", value: escortData.username },
        {
          label: "Documento",
          value: `${escortData.idType} ${escortData.idNumber}`,
        },
        {
          label: "Nombre",
          value: `${escortData.firstName} ${escortData.lastName}`,
        },
        {
          label: "Edad",
          value: escortData.dateOfBirth
            ? `${differenceInHours(
                new Date(),
                new Date(escortData.dateOfBirth)
              )} Horas`
            : "",
        },
        {
          label: "Fecha Nacimiento",
          value: escortData.dateOfBirth.toString() || "",
        },
        { label: "Categoría", value: escortData.categoryName },
        { label: "Pais", value: escortData?.countryName || "" },
        { label: "Ciudad", value: escortData?.cityName || "" },
      ]
    : [];
  return (
    <DetailViewGeneric
      canView
      title={`${instanceDescriptorEscort.singular} ${
        (escortQueryIsSuccess && escortData.alias) || "Cargando..."
      }`}
      attributes={attributes}
    >
      <Services
        currentServices={escortData?.services || []}
        escortId={escortId}
      />
      <ImageList escortId={escortId} />
    </DetailViewGeneric>
  );
};
