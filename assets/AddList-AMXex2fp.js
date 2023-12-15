import{d as k,u as _,r as n,o as T,a as p,c as y,b as t,n as f,t as s,e as L,w as S,v as N,f as g,g as v}from"./index-8E4IfCOj.js";const C={class:"fixed inset-0 z-10 w-screen overflow-y-auto"},A={class:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"},M={class:"transition-colors duration-500 bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4"},V={class:"sm:flex sm:items-start"},O={class:"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"},j={class:"transition-colors duration-500 text-base font-semibold leading-6 text-gray-900 dark:text-white",id:"modal-title"},z={class:"mt-2"},B={class:"transition-colors duration-500 text-sm text-gray-500 dark:text-gray-200"},D={style:{whiteSpace:"pre-wrap",overflowWrap:"break-word"}},E=t("label",{for:"listName",class:"transition-colors duration-500 text-gray-900 dark:text-gray-200",style:{whiteSpace:"pre-wrap",overflowWrap:"break-word"}},"List Name: ",-1),K={key:0,class:"error text-red-500"},W={class:"bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"},R=k({__name:"AddList",props:{title:{type:String,default:"Warning"},description:{type:String,default:""},okTitle:{type:String,default:"Ok"},cancelTitle:{type:String,default:"Cancel"}},emits:["accept","cancel"],setup(x,{emit:w}){const{createTodoList:b}=_(),a=x,o=n(!1),m=n(!0),l=n(""),d=n("Todo List"),i=w;T(()=>{setTimeout(()=>{o.value=!0},50)});const u=()=>{let r=b(d.value);r.error?l.value=r.error:(l.value="",c())};function c(){o.value=!1,setTimeout(()=>{m.value=!1},100)}return(r,e)=>m.value?(p(),y("div",{key:0,class:"relative z-10","aria-labelledby":"modal-title",role:"dialog","aria-modal":"true",onKeydown:e[4]||(e[4]=g(()=>{i("cancel"),c()},["esc"]))},[t("div",{class:f(["OVERLAY fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300 opacity-0",{"opacity-100":o.value}])},null,2),t("div",C,[t("div",A,[t("div",{class:f(["MODAL_PANEL relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",{"opacity-100 translate-y-0 sm:scale-100":o.value}])},[t("div",M,[t("div",V,[t("div",O,[t("h3",j,s(a.title),1),t("div",z,[t("p",B,s(a.description),1),t("div",D,[L(r.$slots,"default"),E,S(t("input",{type:"text",name:"listName",class:"text-white p-2 rounded-md",onKeydown:e[0]||(e[0]=g(()=>{i("accept"),u()},["enter"])),"onUpdate:modelValue":e[1]||(e[1]=h=>d.value=h)},null,544),[[N,d.value]]),l.value?(p(),y("div",K,s(l.value),1)):v("",!0)])])])])]),t("div",W,[t("button",{type:"button",onClick:e[2]||(e[2]=()=>{i("accept"),u()}),class:"inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"},s(a.okTitle),1),t("button",{type:"button",onClick:e[3]||(e[3]=()=>{i("cancel"),c()}),class:"mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"},s(a.cancelTitle),1)])],2)])])],32)):v("",!0)}});export{R as default};