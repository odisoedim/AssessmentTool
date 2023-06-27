<template>
  <div class="bg-kh-blue-grey-100">
    <LandingLayoutCenter>
      <div
        class="pt-16 pb-15.5 pl-9 pr-[219px] flex justify-between items-center"
      >
        <div>
          <CeImage
            class="w-[162px] h-[39px] mb-6"
            :src="CATSmallLogo"
            alt="Circularity Assessment Tool"
          ></CeImage>
          <CeImage
            class="w-[220px] h-10"
            :src="Powered"
            alt="Circle Economy"
          ></CeImage>
        </div>
        <div>
          <CeHeading5>
            <a
              href="https://www.circle-economy.com/contact"
              target="_blank"
              rel="noopener norefferrer"
            >
              Contact Us
            </a>
          </CeHeading5>
        </div>
        <div>
          <CeSmallText
            v-for="item in agreements"
            :key="item.text"
            class="mb-2 last:m-0"
          >
            <a
              class="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed"
              :href="item.src"
              :title="item.text"
              >{{ item.text }}</a
            >
          </CeSmallText>
        </div>
      </div>
    </LandingLayoutCenter>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  onUnmounted,
} from '@nuxtjs/composition-api'
import LandingLayoutCenter from '~/components/atoms/LandingLayoutCenter.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'

const addScript = function (_url: string) {
  if (process.client) {
    const d = document
    const s = d.createElement('script')
    s.src = _url
    const tag = d.getElementsByTagName('script')[0]
    if (tag && tag.parentNode) {
      tag.parentNode.insertBefore(s, tag)
    }
  }
}

const addIub = () => {
  if (process.client) {
    window._iub = {
      csConfiguration: {
        lang: 'en',
        siteId: 50690119,
        cookiePolicyId: 50690119,
      },
    }
  }
}

const addScripts = () => {
  addScript('https://cdn.iubenda.com/iubenda.js')
  addScript('https://cdn.iubenda.com/cs/iubenda_cs.js')
}

export default defineComponent({
  name: 'LandingFooter',
  serverCacheKey: /* istanbul ignore next */ () => `LandingFooter`,
  components: {
    LandingLayoutCenter,
    CeImage,
    CeHeading5,
    CeSmallText,
  },
  setup() {
    const CATSmallLogo = ref(require(`~/assets/images/CATSmallLogo.png`))
    const Powered = ref(require(`~/assets/images/Powered.png`))
    const agreements = reactive([
      {
        text: 'Terms and conditions',
        src: 'https://www.iubenda.com/terms-and-conditions/50690119',
      },
      {
        text: 'Privacy Policy',
        src: 'https://www.iubenda.com/privacy-policy/50690119',
      },
      {
        text: 'Cookie Policy',
        src: 'https://www.iubenda.com/privacy-policy/50690119/cookie-policy',
      },
    ])
    onMounted(() => {
      addIub()
      window.addEventListener('load', addScripts)
    })
    onUnmounted(() => {
      window.removeEventListener('load', addScripts)
    })
    return {
      CATSmallLogo,
      Powered,
      agreements,
    }
  },
})
</script>
