module.exports=[20238,a=>{"use strict";a.s(["default",()=>j],20238);var b=a.i(87924),c=a.i(72131),d=a.i(38246),e=a.i(32636),f=a.i(40077),g=a.i(63672),h=a.i(50194);function i(){let{language:a,setLanguage:c}=(0,h.useLanguage)();return(0,b.jsxs)("button",{onClick:()=>{"zh"===a?c("ko"):"ko"===a?c("en"):c("zh")},className:"flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors",title:"zh"===a?"Switch to Korean":"ko"===a?"Switch to English":"Switch to Chinese",children:[(0,b.jsx)("span",{className:`${"zh"===a?"text-red-600 font-semibold":"text-gray-400"}`,children:"中文"}),(0,b.jsx)("span",{className:"text-gray-300",children:"/"}),(0,b.jsx)("span",{className:`${"ko"===a?"text-red-600 font-semibold":"text-gray-400"}`,children:"한국어"}),(0,b.jsx)("span",{className:"text-gray-300",children:"/"}),(0,b.jsx)("span",{className:`${"en"===a?"text-red-600 font-semibold":"text-gray-400"}`,children:"English"})]})}function j(){let[a,j]=(0,c.useState)(!1),{user:k,userProfile:l,isAuthenticated:m,loading:n}=(0,e.useAuth)(),{isAdmin:o,userRole:p,adminLoading:q}=(0,f.useAdminAuth)(),{t:r}=(0,h.useLanguage)();console.log("Header - isAuthenticated:",m),console.log("Header - isAdmin:",o),console.log("Header - userRole:",p),console.log("Header - adminLoading:",q);let s=async()=>{await (0,g.logout)(),j(!1)};return(0,b.jsx)("header",{className:"bg-white shadow-sm border-b",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,b.jsxs)("div",{className:"flex justify-between items-center h-16",children:[(0,b.jsxs)("div",{className:"flex-shrink-0 flex items-center space-x-2",children:[(0,b.jsx)(d.default,{href:"/",className:"text-lg md:text-2xl font-bold text-red-600",children:r("site.title")}),(0,b.jsx)("div",{className:"md:hidden",children:(0,b.jsx)(i,{})})]}),(0,b.jsxs)("nav",{className:"hidden md:flex space-x-8",children:[(0,b.jsx)(d.default,{href:"/",className:"text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium",children:r("nav.home")}),(0,b.jsx)(d.default,{href:"/instagram",className:"text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium",children:r("nav.instagram")}),!q&&o||m&&k?.email==="sprince1004@naver.com"?(0,b.jsx)(d.default,{href:"/admin",className:"text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium",children:r("nav.admin")}):null,m&&(0,b.jsx)(d.default,{href:"/mypage",className:"text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium",children:r("nav.mypage")})]}),(0,b.jsxs)("div",{className:"hidden md:flex items-center space-x-4",children:[(0,b.jsx)(i,{}),n?(0,b.jsx)("div",{className:"text-gray-500",children:r("nav.loading")}):m?(0,b.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,b.jsxs)("span",{className:"text-gray-700",children:[r("nav.welcome"),", ",l?.displayName||k?.displayName||r("nav.user"),r("nav.honorific")?r("nav.honorific"):""]}),(0,b.jsx)("button",{onClick:s,className:"text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium",children:r("nav.logout")})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(d.default,{href:"/login",className:"text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium",children:r("nav.login")}),(0,b.jsx)(d.default,{href:"/register",className:"bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700",children:r("nav.register")})]})]}),(0,b.jsx)("div",{className:"md:hidden",children:(0,b.jsx)("button",{onClick:()=>j(!a),className:"text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600",children:(0,b.jsx)("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})})]}),a&&(0,b.jsx)("div",{className:"md:hidden",children:(0,b.jsxs)("div",{className:"px-2 pt-2 pb-3 sm:px-3 bg-white border-t",children:[(0,b.jsxs)("div",{className:`grid gap-2 ${!q&&o||m&&k?.email==="sprince1004@naver.com"?"grid-cols-2":"grid-cols-3"}`,children:[(0,b.jsx)(d.default,{href:"/",className:"text-gray-700 hover:text-white px-2 py-2 text-xs font-medium text-center border border-pink-200 rounded bg-pink-50 hover:bg-pink-200 transition-colors",children:r("nav.home")}),(0,b.jsx)(d.default,{href:"/instagram",className:"text-gray-700 hover:text-white px-2 py-2 text-xs font-medium text-center border border-purple-200 rounded bg-purple-50 hover:bg-purple-200 transition-colors",children:r("nav.instagram")}),!q&&o||m&&k?.email==="sprince1004@naver.com"?(0,b.jsx)(d.default,{href:"/admin",className:"text-gray-700 hover:text-white px-2 py-2 text-xs font-medium text-center border border-blue-200 rounded bg-blue-50 hover:bg-blue-200 transition-colors",children:r("nav.admin")}):null,m&&(0,b.jsx)(d.default,{href:"/mypage",className:"text-gray-700 hover:text-white px-2 py-2 text-xs font-medium text-center border border-green-200 rounded bg-green-50 hover:bg-green-200 transition-colors",children:r("nav.mypage")})]}),(0,b.jsx)("div",{className:"border-t pt-4 mt-2",children:n?(0,b.jsx)("div",{className:"text-gray-500 px-3 py-2",children:r("nav.loading")}):m?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{className:"text-gray-700 px-3 py-2 text-base",children:[r("nav.welcome"),", ",l?.displayName||k?.displayName||r("nav.user"),r("nav.honorific")?r("nav.honorific"):""]}),(0,b.jsx)("button",{onClick:s,className:"block text-gray-700 hover:text-red-600 px-3 py-2 text-base font-medium w-full text-left",children:r("nav.logout")})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(d.default,{href:"/login",className:"block text-gray-700 hover:text-red-600 px-3 py-2 text-base font-medium",children:r("nav.login")}),(0,b.jsx)(d.default,{href:"/register",className:"block bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 mt-2",children:r("nav.register")})]})})]})})]})})}},84604,a=>{"use strict";a.s(["default",()=>j]);var b=a.i(87924),c=a.i(50194),d=a.i(50944),e=a.i(72131),f=a.i(18851),g=a.i(32636),h=a.i(71987),i=a.i(58247);function j({experience:a,isInstagram:j=!1}){let{t:k,currentLanguage:l}=(0,c.useLanguage)(),m=(0,d.useRouter)(),{isAuthenticated:n,loading:o}=(0,g.useAuth)(),[p,q]=(0,e.useState)(0),[r,s]=(0,e.useState)(!1),[t,u]=(0,e.useState)(!1);(0,e.useEffect)(()=>{a.image&&(console.log("ExperienceCard 이미지 URL:",a.image),console.log("이미지 로딩 상태:",t))},[a.image,t]);let v=a=>{if("ko"===l)return a;let b={"【REVU 포인트_5만】TERRA LIGHT 무설탕 맥주":"【REVU积分_5万】TERRA LIGHT无糖啤酒","【주말 방문 가능】보승회관 신사역점":"【周末可访问】保胜会馆新沙站店","【주말 방문 가능】서울88맥주":"【周末可访问】首尔88烧酒","【방문형 체험】더블유컨셉 강남점":"【访问型体验】W概念江南店","【배송형 체험】아모레퍼시픽 설화수":"【配送型体验】爱茉莉太平洋雪花秀","【방문형 체험】롯데월드타워 전망대":"【访问型体验】乐天世界塔展望台","【배송형 체험】삼성 갤럭시 S24":"【配送型体验】三星Galaxy S24","MARITHE 광장시장점":"MARITHE广藏市场店",천안맛집:"天安美食店",뷰티:"美容","하리 원장님_헤어(고바이씬 헤어살롱)":"哈里院长_发型(高拜新发型沙龙)","서울랜드 방문":"首尔乐园访问",성형외과:"整形外科","강남 맛집":"江南美食店","【周末可访问】보승회관 신사역점":"【周末可访问】保胜会馆新沙站店","【周末可访问】首尔88烧酒":"【周末可访问】首尔88烧酒","【REVU积分_5万】 TERRA LIGH...":"【REVU积分_5万】TERRA LIGHT无糖啤酒","한국 국민 맥주! 칼로리 33% 감소!":"韩国国民啤酒！卡路里减少33%！","순대국밥|백숙|돼지갈비탕 등 한식 체인점":"血肠汤饭|白切鸡|猪肉排骨汤等韩式连锁店","고급 화장품 브랜드 체험":"高级化妆品品牌体验","한국 대표 화장품 브랜드":"韩国代表化妆品品牌","서울 최고 전망대 체험":"首尔最高展望台体验","최신 스마트폰 체험":"最新智能手机体验","한국 전통 시장 체험":"韩国传统市场体验","전통 한국 음식 체험":"传统韩国美食体验","고급 헤어 스타일링 체험":"高级发型设计体验","테마파크 체험":"主题公园体验","한국 전통 시장에서의 쇼핑 체험":"韩国传统市场购物体验","전통 한국 음식 맛보기":"传统韩国美食品尝","고급 헤어 스타일링 서비스":"高级发型设计服务","테마파크에서의 즐거운 시간":"主题公园的快乐时光","최신 스마트폰 기능 체험":"最新智能手机功能体验","한국 대표 화장품 브랜드 체험":"韩国代表化妆品品牌体验","서울 최고 전망대에서의 경치 감상":"首尔最高展望台风景欣赏","고급 화장품 브랜드 제품 체험":"高级化妆品品牌产品体验","한국 국민 맥주 맛보기":"韩国国民啤酒品尝","순대국밥 등 전통 한식 체험":"血肠汤饭等传统韩食体验",테스트:"测试",이뻐지기:"变漂亮","천안 맛집 테스트입니다.":"这是天安美食店测试。","테스트입니다.":"这是测试。","선미/배두나/한예슬/권상우/정혜성 동일 미용실":"宣美/裴斗娜/韩艺瑟/权相佑/郑惠成同一美容院","한국 최대 종합 테마파크":"韩国最大综合主题公园","종로 인기 소주방":"钟路人气烧酒屋","한국 인기 디자이너 브랜드 팝업":"韩国人气设计师品牌快闪店","혈장탕밥|백숙|돼지갈비탕 등 한식 체인점":"血肠汤饭|白切鸡|猪肉排骨汤等韩式连锁店","배송형 체험":"配送型体验","방문형 체험":"访问型体验",식품:"食品","Revu 포인트":"Revu积分","맛집 체험":"美食体验",화장품:"化妆品",관광:"观光",전자제품:"电子产品",스마트폰:"智能手机",패션:"时尚",헤어:"发型",테마파크:"主题公园"};if(b[a])return b[a];let c=a;return c.replace(/체험/g,"体验").replace(/방문/g,"访问").replace(/맛집/g,"美食店").replace(/한국/g,"韩国").replace(/서울/g,"首尔").replace(/강남/g,"江南").replace(/테스트/g,"测试").replace(/브랜드/g,"品牌").replace(/팝업/g,"快闪店").replace(/디자이너/g,"设计师").replace(/인기/g,"人气").replace(/최대/g,"最大").replace(/종합/g,"综合").replace(/테마파크/g,"主题公园").replace(/소주방/g,"烧酒屋").replace(/종로/g,"钟路").replace(/미용실/g,"美容院").replace(/헤어/g,"发型").replace(/살롱/g,"沙龙").replace(/원장님/g,"院长").replace(/동일/g,"同一").replace(/포인트/g,"积分").replace(/무설탕/g,"无糖").replace(/맥주/g,"啤酒").replace(/칼로리/g,"卡路里").replace(/감소/g,"减少").replace(/순대국밥/g,"血肠汤饭").replace(/백숙/g,"白切鸡").replace(/돼지갈비탕/g,"猪肉排骨汤").replace(/한식/g,"韩式").replace(/체인점/g,"连锁店").replace(/화장품/g,"化妆品").replace(/고급/g,"高级").replace(/대표/g,"代表").replace(/전망대/g,"展望台").replace(/스마트폰/g,"智能手机").replace(/전통/g,"传统").replace(/시장/g,"市场").replace(/음식/g,"美食").replace(/스타일링/g,"设计").replace(/서비스/g,"服务").replace(/기능/g,"功能").replace(/경치/g,"风景").replace(/감상/g,"欣赏").replace(/제품/g,"产品").replace(/맛보기/g,"品尝").replace(/쇼핑/g,"购物").replace(/시간/g,"时间").replace(/즐거운/g,"快乐").replace(/주말/g,"周末").replace(/방문 가능/g,"可访问").replace(/배송형/g,"配送型").replace(/방문형/g,"访问型").replace(/모집/g,"招募").replace(/진행/g,"进行").replace(/완료/g,"完成").replace(/신청/g,"申请").replace(/지금/g,"立即").replace(/마감/g,"结束").replace(/로딩중/g,"加载中").replace(/명/g,"名").replace(/일/g,"天").replace(/남은/g,"剩余").replace(/기간/g,"期间").replace(/참여/g,"参与").replace(/정보/g,"信息").replace(/혜택/g,"福利").replace(/조건/g,"条件").replace(/요구사항/g,"要求").replace(/필요/g,"需要").replace(/가능/g,"可能").replace(/이상/g,"以上").replace(/성인/g,"成人").replace(/관심/g,"兴趣").replace(/경험/g,"经验").replace(/후기/g,"后记").replace(/작성/g,"撰写").replace(/SNS/g,"SNS").replace(/계정/g,"账户").replace(/보유/g,"拥有").replace(/지급/g,"支付").replace(/무료/g,"免费").replace(/브랜드/g,"品牌").replace(/굿즈/g,"周边").replace(/증정/g,"赠送").replace(/특별/g,"特别").replace(/할인/g,"折扣").replace(/혜택/g,"优惠")},w=(()=>{if(!a.recruitmentEndDate)return a.daysLeft;let b=new Date;return Math.max(0,Math.ceil((new Date(a.recruitmentEndDate).getTime()-b.getTime())/864e5))})(),x=(()=>{if(!a.recruitmentStartDate||!a.recruitmentEndDate)return a.status;let b=new Date,c=new Date(a.recruitmentStartDate),d=new Date(a.recruitmentEndDate);if(b<c||b>=c&&b<=d)return"recruiting";if(b>d)return a.startDate&&!(b<new Date(a.startDate))?"completed":"ongoing";return a.status})();(0,e.useEffect)(()=>{u(!1)},[a.image]),(0,e.useEffect)(()=>{let b=async()=>{s(!0);try{console.log("체험단 ID로 신청자 수 조회:",a.id,"인스타그램:",j);let b=j?await (0,f.getInstagramApplicationsByExperience)(a.id):await (0,f.getApplicationsByExperience)(a.id);console.log("신청자 수 조회 결과:",b),b.success?(console.log("신청자 수:",b.applications.length),q(b.applications.length)):(console.error("신청자 수 조회 실패:",b.error),q(0))}catch(a){console.error("신청자 수 로딩 오류:",a),q(0)}finally{s(!1)}};b();let c=()=>{b()},d=setInterval(b,3e4);return window.addEventListener("focus",c),()=>{clearInterval(d),window.removeEventListener("focus",c)}},[a.id]);let y=w<=3;return(0,b.jsxs)("div",{className:`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 ${j?"hover:shadow-pink-500/25 hover:shadow-2xl hover:ring-2 hover:ring-pink-500/20":"hover:shadow-red-500/25 hover:shadow-2xl hover:ring-2 hover:ring-red-500/20"}`,children:[(0,b.jsxs)("div",{className:"relative",children:[a.image&&"/api/placeholder/300/200"!==a.image?(0,b.jsxs)("div",{className:"relative w-full aspect-square",children:[!t&&(0,b.jsx)(i.default,{}),(0,b.jsx)(h.default,{src:a.image,alt:a.title,fill:!0,className:`object-cover ${t?"opacity-100":"opacity-0"} transition-opacity duration-300`,onLoad:()=>{console.log("이미지 로드 성공:",a.image),u(!0)},onError:b=>{console.error("이미지 로드 실패:",a.image,b),u(!1)},priority:!1,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",placeholder:"blur",blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",unoptimized:!1}),!t&&(0,b.jsx)("div",{className:"absolute inset-0 w-full aspect-square bg-gray-200 flex items-center justify-center",children:(0,b.jsx)("span",{className:"text-gray-400",children:k("card.imagePlaceholder")})})]}):(0,b.jsx)("div",{className:"w-full aspect-square bg-gray-200 flex items-center justify-center",children:(0,b.jsx)("span",{className:"text-gray-400",children:k("card.imagePlaceholder")})}),(0,b.jsxs)("div",{className:"absolute top-3 left-3 flex flex-col gap-2",children:[(0,b.jsx)("span",{className:"bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium",children:k("reporter"===a.activityType?"card.reporter":"card.experience")}),(0,b.jsxs)("div",{className:"flex gap-2",children:[a.isNew&&(0,b.jsx)("span",{className:"bg-green-500 text-white px-2 py-1 rounded text-xs font-medium",children:k("card.new")}),y&&(0,b.jsx)("span",{className:"bg-red-500 text-white px-2 py-1 rounded text-xs font-medium",children:k("card.urgent")})]})]}),(0,b.jsx)("div",{className:"absolute top-3 right-3",children:(0,b.jsx)("span",{className:`text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${"recruiting"===x?"bg-green-500":"ongoing"===x?"bg-yellow-500":"bg-gray-500"}`,children:k("recruiting"===x?"card.recruiting":"ongoing"===x?"card.ongoing":"card.completed")})})]}),(0,b.jsxs)("div",{className:"p-3 sm:p-4",children:[(0,b.jsx)("h3",{className:"text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-1",children:"zh"===l?a.titleZh||v(a.title):"en"===l?(console.log("영어 제목 표시:",{titleEn:a.titleEn,title:a.title}),a.titleEn||a.title):a.title}),(0,b.jsx)("p",{className:"text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 min-h-[2.5rem]",children:"zh"===l?a.descriptionZh||v(a.description):"en"===l?(console.log("영어 설명 표시:",{descriptionEn:a.descriptionEn,description:a.description}),a.descriptionEn||a.description):a.description}),!1,(0,b.jsxs)("div",{className:"mb-4",children:[(0,b.jsxs)("div",{className:"block sm:hidden space-y-1",children:[(0,b.jsx)("div",{className:"text-sm text-gray-600",children:(0,b.jsx)("span",{className:"font-medium text-red-600",children:r?k("card.loading"):`${p} / ${a.maxParticipants}${k("card.recruiting")}`})}),(0,b.jsxs)("div",{className:"text-sm text-gray-600",children:[k("card.daysLeft")," ",(0,b.jsx)("span",{className:"font-medium text-orange-600",children:w})," ",k("card.days")]})]}),(0,b.jsxs)("div",{className:"hidden sm:flex items-center justify-between",children:[(0,b.jsx)("div",{className:"flex items-center text-sm text-gray-600",children:(0,b.jsx)("span",{className:"font-medium text-red-600",children:r?k("card.loading"):`${p} / ${a.maxParticipants}${k("card.recruiting")}`})}),(0,b.jsxs)("div",{className:"text-sm text-gray-600",children:[k("card.daysLeft")," ",(0,b.jsx)("span",{className:"font-medium text-orange-600",children:w})," ",k("card.days")]})]})]}),(0,b.jsx)("button",{onClick:()=>{if(!(w<=0)){if(!o&&!n)return void m.push("/login");o||(j?m.push(`/instagram/experiences/${a.id}`):m.push(`/experiences/${a.id}`))}},disabled:w<=0,className:`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors ${w<=0?"bg-gray-400 text-gray-200 cursor-not-allowed":"bg-red-600 text-white hover:bg-red-700"}`,children:k(w<=0?"card.closed":"card.apply")})]})]})}},56283,a=>{"use strict";a.s(["default",()=>h],56283);var b=a.i(87924),c=a.i(72131),d=a.i(50194);function e({isOpen:a,onClose:c,title:d,content:e}){return a?(0,b.jsxs)("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[(0,b.jsx)("div",{className:"absolute inset-0 bg-black bg-opacity-50",onClick:c}),(0,b.jsxs)("div",{className:"relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between p-6 border-b border-gray-200",children:[(0,b.jsx)("h2",{className:"text-xl font-semibold text-gray-900",children:d}),(0,b.jsx)("button",{onClick:c,className:"text-gray-400 hover:text-gray-600 transition-colors",children:(0,b.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),(0,b.jsx)("div",{className:"p-6 overflow-y-auto max-h-[calc(90vh-120px)]",children:(0,b.jsx)("div",{className:"prose prose-sm max-w-none",children:(0,b.jsx)("pre",{className:"whitespace-pre-wrap text-sm text-gray-700 leading-relaxed",children:e})})}),(0,b.jsx)("div",{className:"flex justify-end p-6 border-t border-gray-200 bg-gray-50",children:(0,b.jsx)("button",{onClick:c,className:"px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors",children:"닫기"})})]})]}):null}let f=`제1조(목적)
이 약관은 김해준(전자상거래 사업자)이 운영하는 잘파는 체험단 사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리/ 의무 및 책임사항을 규정함을 목적으로 합니다.
※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」



제2조(정의)
① "몰"이란 잘파는 체험단 회사가 재화 또는 용역(이하 "재화 등"이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
② "이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
③ '회원'이라 함은 "몰"에 회원등록을 한 자로서, 계속적으로 "몰"이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
④ '비회원'이라 함은 회원에 가입하지 않고 "몰"이 제공하는 서비스를 이용하는 자를 말합니다.



제3조 (약관 등의 명시와 설명 및 개정)
① "몰"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보보호책임자등을 이용자가 쉽게 알 수 있도록 부스트웹 사이버몰의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
② "몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회,배송책임, 환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
③ "몰"은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
④ "몰"이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 "몰"은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
⑤ "몰"이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 "몰"에 송신하여 "몰"의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.



제4조(서비스의 제공 및 변경)
① "몰"은 다음과 같은 업무를 수행합니다.
1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결
2. 구매계약이 체결된 재화 또는 용역의 배송
3. 기타 "몰"이 정하는 업무
② "몰"은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
③ "몰"이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다.
④ 전항의 경우 "몰"은 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, "몰"이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.



제5조(서비스의 중단)
① "몰"은 컴퓨터 등 정보통신설비의 보수점검 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
② "몰"은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, "몰"이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 "몰"은 제8조에 정한 방법으로 이용자에게 통지하고 당초 "몰"에서 제시한 조건에 따라 소비자에게 보상합니다. 다만, "몰"이 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 "몰"에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다.



제6조(회원가입)
① 이용자는 "몰"이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
② "몰"은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실 후 3년이 경과한 자로서 "몰"의 회원재가입 승낙을 얻은 경우에는 예외로 한다.
2. 등록 내용에 허위, 기재누락, 오기가 있는 경우
3. 기타 회원으로 등록하는 것이 "몰"의 기술상 현저히 지장이 있다고 판단되는 경우
③ 회원가입계약의 성립 시기는 "몰"의 승낙이 회원에게 도달한 시점으로 합니다.
④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 "몰"에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.



제7조(회원 탈퇴 및 자격 상실 등)
① 회원은 "몰"에 언제든지 탈퇴를 요청할 수 있으며 "몰"은 즉시 회원탈퇴를 처리합니다.
② 회원이 다음 각 호의 사유에 해당하는 경우, "몰"은 회원자격을 제한 및 정지시킬 수 있습니다.
1. 가입 신청 시에 허위 내용을 등록한 경우
2. "몰"을 이용하여 구입한 재화 등의 대금, 기타 "몰"이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우
3. 다른 사람의 "몰" 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우
4. "몰"을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
③ "몰"이 회원 자격을 제한?정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 "몰"은 회원자격을 상실시킬 수 있습니다.
④ "몰"이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.`,g=`잘파는 체험단는 (이하 "회사"는) 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.
회사는 개인정보처리방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.

■ 수집하는 개인정보 항목 및 수집방법
가. 수집하는 개인정보의 항목
o 회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
- 회원가입시 : 이름 , 생년월일 , 성별 , 로그인ID , 비밀번호 , 자택 전화번호 , 휴대전화번호 , 이메일 , 14세미만 가입자의 경우 법정대리인의 정보
- 서비스 신청시 : 주소, 결제 정보

o 서비스 이용 과정이나 사업 처리 과정에서 서비스이용기록, 접속로그, 쿠키, 접속 IP, 결제 기록, 불량이용 기록이 생성되어 수집될 수 있습니다.

나. 수집방법
- 홈페이지, 서면양식, 게시판, 이메일, 이벤트 응모, 배송요청, 전화, 팩스, 생성 정보 수집 툴을 통한 수집

■ 개인정보의 수집 및 이용목적
회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
o 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
콘텐츠 제공 , 구매 및 요금 결제 , 물품배송 또는 청구지 등 발송 , 금융거래 본인 인증 및 금융 서비스
o 회원 관리
회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 불량회원의 부정 이용 방지와 비인가 사용 방지 , 가입 의사 확인 , 연령확인 , 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 불만처리 등 민원처리 , 고지사항 전달
o 마케팅 및 광고에 활용
이벤트 등 광고성 정보 전달 , 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계

■ 개인정보의 보유 및 이용기간
원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.

가. 회사 내부방침에 의한 정보보유 사유
회원이 탈퇴한 경우에도 불량회원의 부정한 이용의 재발을 방지, 분쟁해결 및 수사기관의 요청에 따른 협조를 위하여, 이용계약 해지일로부터 5년간 회원의 정보를 보유할 수 있습니다.

나. 관련 법령에 의한 정보 보유 사유
전자상거래등에서의소비자보호에관한법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
o 계약 또는 청약철회 등에 관한 기록
-보존이유 : 전자상거래등에서의소비자보호에관한법률
-보존기간 : 5년
o 대금 결제 및 재화 등의 공급에 관한 기록
-보존이유: 전자상거래등에서의소비자보호에관한법률
-보존기간 : 5년
o 소비자 불만 또는 분쟁처리에 관한 기록
-보존이유 : 전자상거래등에서의소비자보호에관한법률
-보존기간 : 3년
o 로그 기록
-보존이유: 통신비밀보호법
-보존기간 : 3개월

■ 개인정보의 파기절차 및 방법
회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
o 파기절차
회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어집니다.
별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.
o 파기방법
전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.

■ 개인정보 제공
회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
o 이용자들이 사전에 동의한 경우
o 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우

■ 수집한 개인정보의 위탁
회사는 서비스 이행을 위해 아래와 같이 외부 전문업체에 위탁하여 운영하고 있습니다.

o 위탁 대상자 : [KCP]
o 위탁업무 내용 : [카드결제/ 계좌이체/ 휴대폰결제]


■ 이용자 및 법정대리인의 권리와 그 행사방법
o 이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.
o 이용자들의 개인정보 조회,수정을 위해서는 "개인정보변경"(또는 "회원정보수정" 등)을 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
o 혹은 개인정보보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체없이 조치하겠습니다.
o 귀하가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 통지하여 정정이 이루어지도록 하겠습니다.
o 회사는 이용자의 요청에 의해 해지 또는 삭제된 개인정보는 "회사가 수집하는 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.

■ 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항
회사는 귀하의 정보를 수시로 저장하고 찾아내는 "쿠키(cookie)" 등을 운용합니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다.
회사은(는) 다음과 같은 목적을 위해 쿠키를 사용합니다.
o 쿠키 등 사용 목적
1. 회원과 비회원의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심분야를 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공
2. 귀하는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 귀하는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
o 쿠키 설정 거부 방법
1. 쿠키 설정을 거부하는 방법으로는 회원님이 사용하시는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
2. 설정방법 예(인터넷 익스플로어의 경우) : 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보
3. 단, 귀하께서 쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다.

■ 개인정보에 관한 민원서비스
회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보보호책임자를 지정하고 있습니다.
o 개인정보보호담당자
성명 : 김해준

소속 : 잘파는 체험단

전화번호 : 010-9068-9982

이메일 : sellinglaboratory2025@gmail.com 

o 개인정보보호책임자
성명 : 김해준
소속 : 잘파는 체험단

전화번호 : 010-9068-9982
이메일 : sellinglaboratory2025@gmail.com 



o 귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보보호책임자 혹은 담당부서로 신고하실 수 있습니다.
o 회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.
o 기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
개인정보침해신고센터 (privacy.kisa.or.kr / 국번 없이 118)
대검찰청 사이버범죄수사단 (www.spo.go.kr / 02-3480-2000)
경찰청 사이버안전국 (www.ctrc.go.kr/ 국번 없이 182)`;function h(){let{t:a}=(0,d.useLanguage)(),[h,i]=(0,c.useState)(!1),[j,k]=(0,c.useState)(!1);return(0,b.jsxs)("footer",{className:"bg-gray-900 text-white",children:[(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:[(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"text-2xl font-bold text-gray-200 mb-4",children:a("site.title")}),(0,b.jsx)("p",{className:"text-gray-300 mb-4 max-w-md",children:a("site.description")})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h4",{className:"text-lg font-semibold mb-4",children:"정책 및 약관"}),(0,b.jsxs)("div",{className:"flex flex-wrap gap-4",children:[(0,b.jsx)("button",{onClick:()=>i(!0),className:"text-gray-300 hover:text-white transition-colors text-sm cursor-pointer",children:"이용약관"}),(0,b.jsx)("button",{onClick:()=>k(!0),className:"text-gray-300 hover:text-white transition-colors text-sm cursor-pointer",children:"개인정보처리방침"})]})]})]}),(0,b.jsx)("div",{className:"border-t border-gray-800 mt-8 pt-8",children:(0,b.jsx)("div",{className:"flex justify-center",children:(0,b.jsx)("p",{className:"text-gray-400 text-sm",children:a("footer.copyright")})})})]}),(0,b.jsx)(e,{isOpen:h,onClose:()=>i(!1),title:"이용약관",content:f}),(0,b.jsx)(e,{isOpen:j,onClose:()=>k(!1),title:"개인정보처리방침",content:g})]})}}];

//# sourceMappingURL=src_components_e73c9362._.js.map