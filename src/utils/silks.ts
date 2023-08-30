import { JACKET_MARKINGS, Silk } from "../types/runner";

export const parseSilkUrl = (url: string): Silk => {
    // ROYAL%20BLUE%2C%20YELLOW%20SASH%2C%C2%A0RED%C2%A0CAP

    const parts = url.split("%20");

    const silk: Silk = {
        jacketColour: "",
        jacketMarkings: JACKET_MARKINGS.PLAIN,
    };

    // get jacket markings 
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === "SASH") {
            silk.jacketMarkings = JACKET_MARKINGS.SASH;
            break;
        }
    }

    return silk;
};