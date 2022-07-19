import React, { useEffect, useState } from "react";
import {
  API_ROUTES,
  InstancesDescriptorKeys,
  instancesDescriptor,
} from "@utils/index";
import { useCRUDGenericApiCall } from "@hooks/index";
import {
  DetailViewGeneric,
  DetailViewEscortServices,
  DetailViewEscortImageList,
} from "@components/index";
import { Escort, EscortService, EscortImage } from "@dto/escorts";
import { useParams } from "react-router-dom";
import {
  uploadEscortImage,
  addEscortService,
  removeEscortService,
} from "@api/user";
import { differenceInHours } from "date-fns";

const { escort: escortDescriptorKey, escortService } = InstancesDescriptorKeys;

const instanceDescriptorEscort = instancesDescriptor[escortDescriptorKey];
const instanceDescriptorEscortService = instancesDescriptor[escortService];

const DetailViewEscort: React.FunctionComponent = () => {
  const { id: escortId } = useParams();
  const [instanceData, setInstanceData] = useState<Escort | null>(null);
  const [servicesData, setServicesData] = useState<EscortService[]>([]);
  const [imagesData, setImagesData] = useState<EscortImage[]>([]);
  const { fetch } = useCRUDGenericApiCall<Escort>(
    instanceDescriptorEscort.apiRoute || ""
  );
  const {
    fetchAll: fetchAllImages,
    destroy: deleteImage,
    edit: editImage,
  } = useCRUDGenericApiCall<EscortImage>(API_ROUTES.ESCORT_IMAGES);
  const { fetchAll: fetchAllServices } = useCRUDGenericApiCall<EscortService>(
    instanceDescriptorEscortService.apiRoute || ""
  );
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
            ? `${differenceInHours(
                new Date(),
                new Date(instanceData.dateOfBirth)
              )} Horas`
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
  const fetchImages = async () => {
    const images = await fetchAllImages({
      extended_user__user_id: escortId,
      ordering: "-created",
    });
    setImagesData(images);
  };
  useEffect(() => {
    (async () => {
      if (escortId) {
        const [escort, services, images] = await Promise.all([
          fetch(escortId),
          fetchAllServices(),
          fetchAllImages({
            extended_user__user_id: escortId,
            ordering: "-created",
          }),
        ]);
        setServicesData(services);
        setInstanceData(escort);
        setImagesData(images);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escortId]);
  const onCheckService = async (serviceId: number, checked: boolean) => {
    if (escortId) {
      if (checked) await addEscortService(escortId, { serviceId });
      if (!checked) await removeEscortService(escortId, { serviceId });
      const data = await fetch(escortId);
      setInstanceData(data);
    }
  };
  const onUploadImage = async (file: Blob, imageType: "P" | "I") => {
    if (escortId) await uploadEscortImage(escortId, file, imageType);
    await fetchImages();
  };
  const onDeleteImage = async (imageId: number) => {
    await deleteImage(imageId);
    await fetchImages();
  };
  const onEditPublishedWeb = async (imageId: number, publishedWeb: boolean) => {
    await editImage(imageId, { publishedWeb });
    await fetchImages();
  };
  if (!instanceData) return <></>;
  return (
    <DetailViewGeneric
      canView
      title={`${instanceDescriptorEscort.singular} ${instanceData?.alias}`}
      attributes={attributes}
    >
      {instanceData && servicesData?.length > 0 && (
        <DetailViewEscortServices
          currentServices={instanceData?.services}
          services={servicesData}
          onCheckService={onCheckService}
        />
      )}
      <DetailViewEscortImageList
        images={imagesData}
        uploadImage={onUploadImage}
        deleteImage={onDeleteImage}
        setPublished={onEditPublishedWeb}
      />
    </DetailViewGeneric>
  );
};

export default DetailViewEscort;
