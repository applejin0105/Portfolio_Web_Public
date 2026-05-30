import Cultist from "@logos/Cultist.png";
import Ishmael from "@logos/Ishmael.png";
import To_Do from "@logos/To_Do.png";
import EduBloom from "@logos/EduBloom.png";
import Hugme from "@logos/Hugme.png";
import Ndc_01 from "@etc/Ndc_01.png";
import Ndc_02 from "@etc/Ndc_02.png";
import Ndc_03 from "@etc/Ndc_03.png";

export const PROJECT_DATA = {
  Cultist: {
    id: 1,
    name: "Cultist",
    period: "2025.08 - 진행중",
    role: "프로그래밍",
    status: "앞서 해보기 스팀 출시. 유지보수 진행 중",
    decoIcon: Cultist,
    tags: [
      { name: "#3인 멀티플레이" },
      {
        name: "#CCG",
        url: "https://namu.wiki/w/%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%94%A9%20%EC%B9%B4%EB%93%9C%20%EA%B2%8C%EC%9E%84",
      },
      { name: "#유니티" },
      { name: "#스팀" },
      { name: "#JSON" },
      { name: "#Stagman" },
    ],
    description: `
# [유니티 Mirror 네트워크 기반, 3인 멀티플레이 카드 게임]
기획 및 사운드 담당과 아트 담당과 함께, 3인 개발 게임입니다. 유니티의 Mirror 네트워크와 Facepunch를 기반으로, 3인이 플레이 가능한 인류학적 종교 테마의 카드 게임입니다. 백엔드부터 프론트엔드까지, 모든 로직을 설계하고 구현했습니다.
추후 목표로는 테마에 맞는 추가적인 DLC 추가와 Host 기반 멀티플레이가 아닌, 제대로된 서버에서 돌아가는 멀티플레이 로직을 구현하는 것입니다.

스팀에 앞서 해보기 무료 게임으로 출시했습니다. 또한 git에 코드 전문이 첨부되어있고, ReadMe에 코드에 대한 상세한 설명도 추가되어 있습니다.
`,
    links: {
      git: "https://github.com/applejin0105/Cultist_Public",
      steam: "https://store.steampowered.com/app/4696600/Cultist",
      youtube: "https://youtu.be/ZR8SCa53bXo?si=PQsPuN1dr0dLppEk",
      tistory: "https://waterglass0105.tistory.com/158",
    },
  },

  GunModding: {
    id: 2,
    name: "Gun Modding",
    period: "2025.06 - 현재",
    role: "기획, 아트, 프로그래밍",
    status: "데모 제작중",
    decoIcon: Ishmael,
    tags: [
      { name: "#싱글플레이" },
      { name: "#유니티" },
      { name: "#2.5D" },
      { name: "#총" },
      { name: "#모딩" },
      { name: "#Stagman" },
    ],
    description: `
# [유니티 2.5D, 싱글플레이 로그라이크 게임]
유니티 3D를 기반으로, 2D 스프라이트의 느낌을 살려 제작중인 총 모딩 게임입니다. 세계관부터 게임 내부 요소까지, 우리가 좋아하는 것들을 잔뜩 넣어서 만들어보자는 일념 하나로 제작중인 취미 프로젝트입니다.
아트, 사운드, 게임 로직까지 모든 기술을 하나씩 공부하고 직접 구현하는 것을 목표로, 말 그대로 '언젠가' 완성시킬 프로젝트입니다.

현재는 데모 제작을 위해, 내부 기술 구현과 물리 로직 학습, 유니티 3D 공부를 진행하며 구성요소를 하나씩 구현하는 중입니다.`,
    links: {
      git: "https://github.com/applejin0105/GunModding",
      youtube: "https://youtu.be/gbnhdQrluPs",
      tistory: "https://waterglass0105.tistory.com/151",
    },
  },

  Revortor: {
    id: 3,
    name: "Revortor",
    period: "2024.12 - 현재",
    role: "기획, 아트, 프로그래밍",
    status: "상태",
    decoIcon: Ishmael,
    tags: [
      { name: "#싱글 및 멀티플레이" },
      { name: "#FPS" },
      { name: "#유니티" },
      { name: "#언리얼" },
      { name: "#3D" },
    ],
    description: `
# [언리얼에서 유니티로, 3D 싱글 및 멀티플레이 FPS 팬게임]
기존 언리얼 엔진에서 제작중이던, 프로젝트문 팬 게임인 Revortor입니다. 무너진 로보토미 폐허에서, 꼭대기까지 올라가서 탈출해야하는 토끼의 이야기를 담고 있습니다. 3D 모델링부터 시작해서 내부 로직까지 언리얼 엔진으로 제작중이었으나, 유니티에 좀 더 치중하고 공부해보고자 유니티로 옮겨 제작중에 있습니다.

현재는 기존 언리얼 엔진에서의 네트워크 기반 로직과 코드들을 유니티로 옮기는 작업을 진행중입니다.`,
    links: {
      git: "https://github.com/applejin0105/Revortor",
      youtube: "https://youtu.be/U-z1V5-GAzI",
      tistory: "https://waterglass0105.tistory.com/89",
    },
  },

  SubProgram: {
    id: 4,
    name: "Sub Program",
    period: "2025.01 - 2025.12",
    role: "프로그래밍",
    status: "완료",
    decoIcon: Cultist,
    tags: [
      { name: "#파이썬" },
      { name: "#JSON" },
      { name: "#보조 프로그램" },
      { name: "#바이브코딩" },
    ],
    description: `
# [기획자를 위한 Cultist 카드 제작 프로그램]
기획자의 카드의 효과를 설계하고 JSON으로 옮기는 과정의 부담을 줄여주기 위해 제작한 파이썬 기반 프로그램입니다. AI를 활용한 바이브 코딩으로 제작하였습니다. Cultist에 구현한 이펙트들을 AI로 분석하여 학습시키고, 이를 바탕으로 효과를 드롭박스 형태로 즉석에서 추가 가능한 형태로 프로그램을 제작하였습니다.
`,
    links: {
      git: "https://github.com/applejin0105/SubProgram",
    },
  },

  HitboxMaker: {
    id: 5,
    name: "Hitbox Maker",
    period: "2025.09 - 2025.09",
    role: "프로그래밍",
    status: "완료",
    decoIcon: Ishmael,
    tags: [
      { name: "#파이썬" },
      { name: "#유니티" },
      { name: "#블렌더" },
      { name: "#3D" },
    ],
    description: `
  # [딸깍 한번으로 히트박스 만들기]
  유니티와 블렌더를 사용하여 Skeleton에 Hitbox를 생성하고, 이를 유니티에서 바로 사용할 수 있게 해주는 코드입니다. 앞선 GunModding 게임에서 현실감있는 피격 및 타격 시스템 구현을 위해 고민하던 중, 2D 스프라이트 뒤에 3D 스켈레톤을 배치하고, 여기에 이동, 조준 등 모션을 입혀 히트박스를 제작하자는 아이디어까지 도달했습니다. 이에 맞추어, 캐릭터의 체형 및 크기에 따라 히트박스를 생성하기 위해 제작한 프로그램입니다. 추가로 땅에 서있는지, 아닌지 그리고 유니티 에디터 상에서 뼈 구조를 시각적으로 표현 가능하게 구현하였습니다. 게임 개발을 위한 에디터 스크립트입니다.
    `,
    links: {
      git: "https://github.com/applejin0105/Hitbox-Maker",
      tistory: "https://waterglass0105.tistory.com/152",
    },
  },

  ToDo: {
    id: 6,
    name: "To Do",
    period: "2025.08 - 2025.08",
    role: "프로그래밍",
    status: "완료",
    decoIcon: To_Do,
    tags: [
      { name: "#WPF" },
      { name: "#CCG" },
      { name: "#카카오톡" },
      { name: "#리눅스 서버" },
      { name: "#바이브코딩" },
    ],
    description: `
  # [갓생의 시작, To Do 앱]
  놀고있는 미니 PC를 활용하고자, 추후 게임 서버 공부를 위해 진행한 To Do 프로그램입니다. 기존 델파이에서 제작하던 중 WPF로 제작해보고 싶어서 시작한 프로젝트입니다. 미니 PC(Ubuntu Server)와의 연동, DB 관리, 이를 바탕으로 카카오톡 메시지 보내기까지 구현하였습니다. 현재까지 아주 잘 작동하고 있습니다.
    `,
    links: {
      git: "https://github.com/applejin0105/Todo_Public",
      tistory: "https://waterglass0105.tistory.com/150",
    },
  },

  EduBloom: {
    id: 7,
    name: "EduBloom",
    period: "2025.05 - 2025.06",
    role: "기획, 아트, 프로그래밍",
    status: "완료",
    decoIcon: EduBloom,
    tags: [
      { name: "#델파이" },
      { name: "#DB" },
      { name: "#안드로이드" },
      { name: "#iOS" },
      { name: "#FMX" },
    ],
    description: `
  # [듀오링오 마이너앱]
  강의로 제작할만한 애플리케이션을 기획하고 제작한 뒤, 이를 바탕으로 강의를 제작하라는 업무를 받고 제작한 애플리케이션입니다. 기본 골자는 듀오링고의 시스템에서 따왔으며, 내부 DB를 활용하고, 사용함과 동시에 파이어 몽키라는 델파이 특성으로 진행한 모바일 및 PC에서 모두 작동 가능한 프로그램입니다.
    `,
    links: {
      git: "https://github.com/applejin0105/EduBloom",
    },
  },

  DataStructure: {
    id: 8,
    name: "Data Structure",
    period: "2025.06 - 현재",
    role: "프로그래밍",
    status: "진행중",
    decoIcon: Hugme,
    tags: [{ name: "#C++" }, { name: "#자료구조" }],
    description: `
  # [자료구조를 직접 해보자 무엇을? 구현을]
  프로그래밍 중 사용한 자료구조들을 하나씩 직접 구현하고있습니다. 내부 라이브러리를 사용하지 않고, 마치 C++에서 제공하는 stack, queue, hash등을 직접 생각해서 구현해보고있습니다.
  `,
    links: {
      git: "https://github.com/applejin0105/DataStructure",
      tistory:
        "https://waterglass0105.tistory.com/category/Study/DataStructure",
    },
  },

  DAP: {
    id: 9,
    name: "DAP",
    period: "2021",
    role: "프로그래밍",
    status: "완료",
    thumbnail: Ndc_01,
    decoIcon: Ishmael,
    tags: [
      { name: "#데이터 분석 프로그래밍" },
      { name: "#다키스트 던전" },
      { name: "#AI" },
    ],
    description: `
# [공부하고 탐색한 것들은 언젠가 다 쓸일이 있다]

과거, 데이터분석 프로그래밍 수업 중 제작한 프로젝트입니다. 그 당시 즐겨하던 다키스트 던전이라는 게임을 바탕으로, 가장 관심있었던 '밸런스' 및 '몬스터 AI'를 공부하고자 진행하였던 프로젝트입니다. 게임이 제공하는 변수를 참조하여 해당 조합을 AI로 진행하였을때, 승률과 획득 점수를 분석하고 덱을 진화시키는 것을 목적으로 했습니다.

이에 대해, 최근 방문했던 NDC에서 진행한 [AI를 활용한 캐릭터 밸런스 디자인](https://youtu.be/UwDMURjfga4?si=x3UJx72eoDk5Wtef)에서 동일한 내용이 실제 업계에서 사용중인 것을 확인했고, 관련 내용을 해당 발표자님과 대화로 나누며 많은 조언을 얻었습니다.

![대화 1](${Ndc_01})
![대화 2](${Ndc_02})
![대화 3](${Ndc_03})
`,
    links: {
      git: "https://github.com/applejin0105/DAP_FINAL_PROJECT",
      tistory: "https://applejin0105.github.io/DAP_FINAL_PROJECT/main.html",
    },
  },

  EscapeFromLab: {
    id: 10,
    name: "Escape From Lab",
    period: "2021",
    role: "기획 및 프로그래밍",
    status: "완료",
    decoIcon: Ishmael,
    tags: [
      { name: "#저는" },
      { name: "#HTML로" },
      { name: "#코딩해요" },
      { name: "#웹게임" },
    ],
    description: `
  # [저는 HTML로 코딩해요]
  웹 프로그래밍 기말 과제로 제작한 웹페이지입니다. 단순한 웹 페이지 하나를 제작하는 과제였으나, 게임이 만들고 싶어서 게임으로 제작하였습니다. 조악하고, 부족하지만 첫 게임입니다.
  `,
    links: {
      git: "https://github.com/applejin0105/Escape_from_Lab",
      tistory: "https://applejin0105.github.io/Escape_from_Lab/index.html",
    },
  },

  ReactHomePage: {
    id: 11,
    name: "React HomePage",
    period: "2025.12 - 2026.02",
    role: "기획, 디자인, 프로그래밍",
    status: "완료",
    decoIcon: Ishmael,
    tags: [
      { name: "#React" },
      { name: "#리눅스 서버" },
      { name: "#카카오톡" },
      { name: "#포트폴리오" },
    ],
    description: `
  # [다 만들고나니, 차라리 유니티로 만들...]
  지금 현재 접속중인 홈페이지입니다!
  미니 PC를 구입한 이유이자, 프로그래머라면 홈페이지 포트폴리오가 있어야 한다 라는 똥고집으로 제작한 프로젝트입니다. 원래는 유니티 WebGL도 넣고, 관심있어서 공부중이던 MSX 고전 게임도 제작해서 넣고 싶었으나, 부족한 머리와 실력탓에 줄고 줄어 결국 단순한 React 웹페이지가 되었습니다. 서버, 보안, DB, 통신, 리눅스, HTML5, php등 공부할게 산더미였고 해야할게 산더미였지만 진행하면 진행할수록 코드를 짜는 방법, 구조 등이 머릿속에 그려지기 시작해 나름 보람있고, 재미있는 과정이었습니다.
  `,
    links: {
      tistory:
        "https://waterglass0105.tistory.com/category/Study/Network%20%7C%20Server",
    },
  },
  ReactHomePage_UnityVersion: {
    id: 11,
    name: "React HomePage_UnityVersion",
    period: "2026.02 - 2026.04",
    role: "기획, 디자인, 프로그래밍",
    status: "완료",
    decoIcon: Ishmael,
    tags: [
      { name: "#Unity" },
      { name: "#백엔드" },
      { name: "#프론트엔드" },
      { name: "#포트폴리오" },
    ],
    description: `
  # [그래서, 유니티로도 만들었습니다. 이것저것 추가해서]
  어차피 유니티 개발자로 입사할거라면, 앞서 만든 홈페이지를 유니티로도 만들 수 있어야 한다고 생각했습니다.

  앞선 컬티스트와 마찬가지로 코드 전문이 깃에 업로드되어 있습니다. 당연히, 에셋들은 프로젝트 문의 자산이므로 업로드 하지 않았습니다.
  `,
    links: {
      git: "https://github.com/applejin0105/Portfolio_Unity_Public",
    },
  },
};
