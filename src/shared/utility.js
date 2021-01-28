/**
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};