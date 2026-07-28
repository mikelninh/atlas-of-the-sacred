import { angkor } from "./angkor";
import { borobudur } from "./borobudur";
import { giza } from "./giza";
import { gobekliTepe } from "./gobekli-tepe";
import { halSaflieni } from "./hal-saflieni";
import { newgrange } from "./newgrange";
import { stonehenge } from "./stonehenge";

export const sites = {
  giza,
  "gobekli-tepe": gobekliTepe,
  stonehenge,
  newgrange,
  "hal-saflieni": halSaflieni,
  angkor,
  borobudur,
} as const;
