<template>
  <ResultCard
    body-class="flex items-center"
    :body-bg="option === -1 ? '#fff' : undefined"
  >
    <div class="question-result__left w-[418px]">
      <ce-heading5
        class="w-full truncate"
        :class="{ 'text-kh-grey-200': notApplicable || option === -1 }"
        >{{ subStrategy }}</ce-heading5
      >
      <div v-if="option !== -1" class="flex items-center">
        <div v-if="dots" class="-mr-1">
          <span
            v-for="(i, index) in dots"
            :key="index"
            :class="[i ? 'bg-kh-primary' : 'bg-kh-blue-grey-300']"
            class="inline-block h-[10px] w-[10px] rounded-full mr-1"
          ></span>
        </div>
        <ce-small-text
          class="ml-4"
          :class="{ 'ml-0 text-kh-grey-200': notApplicable }"
          >{{ optionText }}</ce-small-text
        >
      </div>
      <div v-if="!notApplicable && provideExample" class="mt-4">
        <ce-p>{{ provideExample }}</ce-p>
      </div>
    </div>
    <template v-if="!notApplicable && option !== -1">
      <div class="question-result__arrow mx-2">
        <ce-icon name="chevron-right"></ce-icon>
      </div>
      <div class="question-result__right w-[418px]">
        <div v-for="(item, index) in optionSuggestion" :key="item.type + index">
          <ce-heading5 v-if="item.type === 'heading'" class="truncate">
            {{ item.value }}
          </ce-heading5>
          <ce-p v-else-if="item.type === 'paragraph'" class="truncate-2">
            <template v-for="(item2, index2) in item.value">
              <a
                v-if="item2.type === 'link'"
                :key="item2.type + index2"
                :href="item2.href"
                target="_blank"
                class="underline"
                rel="noopener norefferrer"
              >
                {{ item2.value }}
              </a>
              <span
                v-else-if="item2.type === 'text'"
                :key="item2.type + index2"
              >
                {{ item2.value }}
              </span>
            </template>
          </ce-p>
          <ul v-else-if="item.type === 'list'" class="list-disc pl-6">
            <li v-for="(item2, index2) in item.value" :key="index2">
              <ce-p class="truncate-2">
                <template v-for="(item3, index3) in item2">
                  <a
                    v-if="item3.type === 'link'"
                    :key="item3.type + index3"
                    :href="item3.href"
                    target="_blank"
                    class="underline"
                    rel="noopener norefferrer"
                  >
                    {{ item3.value }}
                  </a>
                  <span
                    v-else-if="item3.type === 'text'"
                    :key="item3.type + index3"
                  >
                    {{ item3.value }}
                  </span>
                </template>
              </ce-p>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </ResultCard>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import { useSubStrategyOption } from '~/pages-helper/assessment/survey/subStrategyOption'
import CeP from '~/components/atoms/CeP.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'
import { NOT_APPLICABLE } from '~/util/static'
import ResultCard from '~/components/atoms/ResultCard.vue'

export default defineComponent({
  name: 'QuestionResult',
  components: { ResultCard, CeIcon, CeP, CeSmallText, CeHeading5 },
  props: {
    subStrategy: {
      type: String,
      required: true,
    },
    subStrategyId: {
      type: Number,
      required: true,
    },
    frameworkId: {
      type: Number,
      required: true,
    },
    option: {
      type: Number,
      required: true,
    },
    provideExample: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const optionGroup = useSubStrategyOption()
    const notApplicable = computed(() => props.option === NOT_APPLICABLE)
    const dots = computed(() => {
      if (!notApplicable.value) {
        return [
          ...Array(props.option + 1).fill(1),
          ...Array(4 - props.option).fill(0),
        ]
      }
    })
    const optionText = computed(() => optionGroup.value[props.option])
    const optionSuggestionGroup = [
      [
        {
          type: 'heading',
          value: 'Need help getting started?',
        },
        {
          type: 'list',
          value: [
            [
              {
                type: 'link',
                value: 'Check out these case studies',
                href: `https://knowledge-hub.circle-lab.com/frameworks/${props.frameworkId}/${props.subStrategyId}?curator=Approved`,
              },
              {
                type: 'text',
                value: 'to inspire your circular journey',
              },
            ],
            [
              {
                type: 'text',
                value:
                  'Review your challenges below to learn how you can overcome them',
              },
            ],
          ],
        },
      ],
      [
        {
          type: 'heading',
          value: 'Keep exploring!',
        },
        {
          type: 'list',
          value: [
            [
              {
                type: 'text',
                value: 'Browse reports on this topic on the',
              },
              {
                type: 'link',
                value: 'Circle Economy',
                href: 'https://www.circle-economy.com/',
              },
              {
                type: 'text',
                value: 'website or',
              },
              {
                type: 'link',
                value: 'Knowledge Hub',
                href: `https://knowledge-hub.circle-lab.com/frameworks/${props.frameworkId}/${props.subStrategyId}?curator=Approved`,
              },
              {
                type: 'text',
                value: 'to learn more',
              },
            ],
            [
              {
                type: 'text',
                value:
                  'Find your circular community. Are there any local groups or businesses that could support you?',
              },
            ],
          ],
        },
      ],
      [
        {
          type: 'heading',
          value: "You're on your way!",
        },
        {
          type: 'list',
          value: [
            [
              {
                type: 'link',
                value: 'Browse these case studies',
                href: `https://knowledge-hub.circle-lab.com/frameworks/${props.frameworkId}/${props.subStrategyId}?curator=Approved`,
              },
              {
                type: 'text',
                value: 'to learn how you could take your pilot even further',
              },
            ],
            [
              {
                type: 'text',
                value:
                  'Revisit your challenges below to learn how you can overcome them',
              },
            ],
          ],
        },
      ],
      [
        {
          type: 'heading',
          value: 'Almost there!',
        },
        {
          type: 'list',
          value: [
            [
              {
                type: 'text',
                value: 'Reach out to',
              },
              {
                type: 'link',
                value: 'Circle Economy',
                href: 'https://www.circle-economy.com/contact',
              },
              {
                type: 'text',
                value: 'for a consultation - We can help you get the last mile',
              },
            ],
            [
              {
                type: 'link',
                value: 'Learn how others have implemented this strategy',
                href: `https://knowledge-hub.circle-lab.com/frameworks/${props.frameworkId}/${props.subStrategyId}?curator=Approved`,
              },
            ],
          ],
        },
      ],
      [
        {
          type: 'heading',
          value: 'Keep up the good work!',
        },
        {
          type: 'paragraph',
          value: [
            {
              type: 'text',
              value:
                'Become an inspiration to others by adding a case study about your circular practices to the',
            },
            {
              type: 'link',
              value: 'Knowledge Hub',
              href: 'https://knowledge-hub.circle-lab.com/',
            },
          ],
        },
      ],
    ]
    const optionSuggestion = computed(() => optionSuggestionGroup[props.option])
    return {
      notApplicable,
      dots,
      optionText,
      optionSuggestion,
    }
  },
})
</script>
