// src/data/assetsMap.js

// Common Assets
import Container from "@frames/Container.png?url";

import Curriculum_Vitae from "@logos/Curriculum_Vitae.png?url";
import Cantabile from "@logos/Cantabile.png?url";
import Cultist from "@logos/Cultist.png?url";
import Ishmael from "@logos/Ishmael.png?url";

import Back from "@buttons/Back.png?url";
import Next from "@buttons/Next.png?url";
import Prev from "@buttons/Prev.png?url";

const commonSoundsGlob = import.meta.glob("/src/assets/sounds/*.{wav,WAV}", {
  eager: true,
  query: "?url",
  import: "default",
});

export const SOUND_MAP = Object.fromEntries(
  Object.entries(commonSoundsGlob).map(([path, url]) => {
    const fileName = path
      .split("/")
      .pop()
      .replace(/\.[^/.]+$/, "");
    return [fileName, url];
  }),
);

const commonSounds = Object.values(commonSoundsGlob);

// Page0
import Number from "@buttons/Number.png?url";
import Confirm from "@buttons/Confirm.png?url";
import Correct from "@buttons/Correct.png?url";
import Error from "@buttons/Error.png?url";

// Page1
import Touch_To_Start from "@buttons/Touch_To_Start.png?url";

import Trigger_Warning from "@logos/Trigger_Warning.png?url";
import Test from "@logos/Test.png?url";
import Word from "@logos/Word.png?url";

// Page2

// Page3
import BG_Page3 from "@bg/Page3.png?url";

import ClickableDeco from "@buttons/ClickableDeco.png?url";
import Button_01_S from "@buttons/Button_01_S.png?url";
import Button_01_US from "@buttons/Button_01_US.png?url";
import Button_02_S from "@buttons/Button_02_S.png?url";
import Button_02_US from "@buttons/Button_02_US.png?url";
import Button_03_S from "@buttons/Button_03_S.png?url";
import Button_03_US from "@buttons/Button_03_US.png?url";
import Button_04_S from "@buttons/Button_04_S.png?url";
import Button_04_US from "@buttons/Button_04_US.png?url";
import Copy_Container from "@buttons/Copy_Container.png?url";
import Copy from "@buttons/Copy.png?url";

import UserNameTag_Ticket_L from "@frames/UserNameTag_Ticket_L.png";
import UserNameTag_Ticket_R from "@frames/UserNameTag_Ticket_R.png";
import Button_Container_Handle from "@frames/Button_Container_Handle.png?url";
import Button_Container from "@frames/Button_Container.png?url";
import TextBox from "@frames/TextBox.png?url";
import UserInfoFrame from "@frames/UserInfoFrame.png?url";

import Camera_C from "@logos/Camera_C.png?url";
import Camera_W from "@logos/Camera_W.png?url";
import Handle_C from "@logos/Handle_C.png?url";
import Handle_W from "@logos/Handle_W.png?url";
import Machine_C from "@logos/Machine_C.png?url";
import Machine_W from "@logos/Machine_W.png?url";
import Train_C from "@logos/Train_C.png?url";
import Train_W from "@logos/Train_W.png?url";
import Madness from "@logos/Madness.png?url";
import Banner_Devgear from "@logos/Banner_Devgear.png?url";
import Banner_Cultist from "@logos/Banner_Cultist.png?url";
import Banner_Knu from "@logos/Banner_Knu.png?url";
import Banner_MrKoo from "@logos/Banner_MrKoo.png?url";

import Full_Ishmael from "@etc/Full_Ishmael.png?url";

// Page4
import BG_Page4 from "@bg/Page4.png?url";

import Board from "@frames/Board.png?url";
import Index from "@frames/Index.png?url";
import IndexMain from "@frames/IndexMain.png?url";
import Sub from "@frames/Sub.png?url";
import PDFViewer from "@frames/PDFViewer.png?url";
import PictureFrame from "@frames/PictureFrame.png?url";

import Csharp from "@etc/Csharp.png?url";
import MyPhoto from "@etc/MyPhoto.png?url";
import MyWife from "@etc/MyWife.png?url";
import Moon from "@etc/Moon.png?url";

import Bargain from "@etc/Bargain.png?url";
import Money from "@etc/Money.png?url";
import Fimally from "@etc/Fimally.png?url";

// Page5
import BG_Page5 from "@bg/Page5.png?url";

import ProjectContainer from "@frames/ProjectContainer.png?url";

import To_Do from "@logos/To_Do.png?url";
import EduBloom from "@logos/EduBloom.png?url";
import Hugme from "@logos/Hugme.png?url";
import Ndc_01 from "@etc/Ndc_01.png?url";
import Ndc_02 from "@etc/Ndc_02.png?url";
import Ndc_03 from "@etc/Ndc_03.png?url";

import Git from "@logos/Git.png?url";
import Steam from "@logos/Steam.png?url";
import Tistory from "@logos/Tistory.png?url";
import Youtube from "@logos/Youtube.png?url";
import Homepage from "@logos/Homepage.png?url";

// Page6
import BG_Page6 from "@bg/Page6.png?url";

import GameContainer from "@frames/GameContainer.png?url";

const gameThumbnailsGlob = import.meta.glob("@images/Thumbnails/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});
("sjan ");

const gameThumbnails = Object.values(gameThumbnailsGlob);

// Page7
import Road from "@etc/Road.png?url";

export const PAGE_ASSETS = {
  Common: [
    Container,
    Curriculum_Vitae,
    Cantabile,
    Cultist,
    Ishmael,
    Back,
    Next,
    Prev,
    ...commonSounds,
  ],
  Page0: [Number, Confirm, Correct, Error],
  Page1: [Touch_To_Start, Trigger_Warning, Test, Word],
  Page2: [],
  Page3: [
    BG_Page3,
    ClickableDeco,
    Button_01_S,
    Button_01_US,
    Button_02_S,
    Button_02_US,
    Button_03_S,
    Button_03_US,
    Button_04_S,
    Button_04_US,
    Copy_Container,
    Copy,
    Button_Container_Handle,
    Button_Container,
    TextBox,
    Camera_C,
    Camera_W,
    Handle_C,
    Handle_W,
    Machine_C,
    Machine_W,
    Train_C,
    Train_W,
    Madness,
    Banner_Devgear,
    Banner_Cultist,
    Banner_Knu,
    Banner_MrKoo,
    Full_Ishmael,
    UserNameTag_Ticket_L,
    UserNameTag_Ticket_R,
    UserInfoFrame,
  ],
  Page4: [
    BG_Page4,
    Board,
    Index,
    IndexMain,
    Sub,
    PDFViewer,
    PictureFrame,
    Csharp,
    MyPhoto,
    MyWife,
    Moon,
    Bargain,
    Money,
    Fimally,
  ],
  Page5: [
    BG_Page5,
    ProjectContainer,
    Git,
    Steam,
    Tistory,
    Youtube,
    Homepage,
    To_Do,
    EduBloom,
    Hugme,
    Ndc_01,
    Ndc_02,
    Ndc_03,
  ],
  Page6: [BG_Page6, GameContainer, ...gameThumbnails],
  Page7: [Road],
};
