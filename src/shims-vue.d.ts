declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

//Eine kleine Hilfsdatei oder ein Platzhalter, der eine fehlende Funktionalität überbrückt
