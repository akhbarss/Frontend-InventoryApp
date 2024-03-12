export const nullifyObject = (obj: any) => {
    const nullifiedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        nullifiedObj[key] = null;
      }
    }
    return nullifiedObj;
  };