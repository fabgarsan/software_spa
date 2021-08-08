import React, { useEffect, useState } from "react";
import { API_ROUTES, INSTANCES_NAMES, diffDates } from "@utils/index";
import { useCRUDGenericApiCall } from "@hooks/index";
import { Escort } from "@dbTypes/escorts";
import { useParams, useHistory } from "react-router-dom";
import { DetailViewGeneric } from "@components/index";

const DetailViewEscort: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [instanceData, setInstanceData] = useState<Escort | null>(null);
  const { fetch } = useCRUDGenericApiCall<Escort>(API_ROUTES.USER);
  const attributes = instanceData
    ? [
        { label: "Usuario", value: instanceData.username },
        {
          label: "Documento",
          value: `${instanceData.idType} ${instanceData.idNumber}`,
        },
        {
          label: "Nombre",
          value: `${instanceData.firstName} ${instanceData.lastName}`,
        },
        {
          label: "Edad",
          value: instanceData.dateOfBirth
            ? diffDates(new Date(), instanceData.dateOfBirth, "years")
            : "",
        },
        {
          label: "Fecha Nacimiento",
          value: instanceData.dateOfBirth.toString() || "",
        },
        { label: "Categoría", value: instanceData.categoryName },
        { label: "Pais", value: instanceData?.countryName || "" },
        { label: "Ciudad", value: instanceData?.cityName || "" },
      ]
    : [];
  useEffect(() => {
    const fetchInstance = async () => {
      const data = await fetch(id);
      setInstanceData(data);
    };
    fetchInstance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <DetailViewGeneric
      canView
      title={`${INSTANCES_NAMES.ESCORT_SINGULAR} ${instanceData?.alias}`}
      attributes={attributes}
    >
      <button type="button" onClick={() => history.goBack()}>
        Atras
      </button>
    </DetailViewGeneric>
  );
};

export default DetailViewEscort;
