import { useCallback } from "react";
import { ObjectSchema } from "yup";
import { ObjectShape } from "yup/lib/object";

const useYupValidationResolver = <TShape extends ObjectShape>(
  validationSchema: ObjectSchema<TShape>
) =>
  useCallback(
    // @ts-ignore
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            // @ts-ignore
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export default useYupValidationResolver;
