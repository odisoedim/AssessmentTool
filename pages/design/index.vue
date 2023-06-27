<template>
  <div>
    <div class="w-[1032px] mx-auto">
      <!-- Logo -->
      <div class="my-16">
        <p
          class="
            bg-blue-500
            w-fll
            h-14
            mx-auto
            text-5xl text-white text-center
            font-Rubik
          "
        >
          Logo
        </p>
        <div class="flex items-center my-8">
          <div class="w-36 text-2xl mr-16">Ce logo</div>
          <ce-logo />
        </div>
      </div>
      <!-- Typography -->
      <div class="my-16">
        <p
          class="
            bg-blue-500
            w-fll
            h-14
            mx-auto
            text-5xl text-white text-center
            font-Rubik
          "
        >
          Typography
        </p>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">H1</p>
          <ce-heading-1>Page Title</ce-heading-1>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">H2</p>
          <ce-heading-2>This is a section title</ce-heading-2>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">H3</p>
          <ce-heading-3>This is a question?</ce-heading-3>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">H4</p>
          <ce-heading-4>This is a subheader</ce-heading-4>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">H5</p>
          <ce-heading-5>This is a body header</ce-heading-5>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">Body</p>
          <ce-p> This is body text.</ce-p>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">Small text</p>
          <ce-small-text>This is small text</ce-small-text>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">Fine print</p>
          <ce-fine-print>This is fine print</ce-fine-print>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">Tab label</p>
          <ce-tab-label>Inactive tab</ce-tab-label>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">Menu item</p>
          <ce-menu-item>Inactive item</ce-menu-item>
        </div>
        <div class="flex items-center my-8">
          <p class="w-36 text-2xl mr-16">Link</p>
          <ce-link>Link</ce-link>
        </div>
      </div>
      <!-- Icons -->
      <div class="my-16">
        <p
          class="
            bg-blue-500
            w-fll
            h-14
            mx-auto
            text-5xl text-white text-center
            font-Rubik
          "
        >
          Icons
        </p>
        <div class="flex items-center my-8">
          <div class="w-36 text-2xl mr-16">Icon</div>
          <div>
            <ce-icon name="check-mark" />
            <ce-icon name="more-horizontal" />
            <ce-icon name="menu" />
            <ce-icon name="globe" />
            <ce-icon name="map-pin" />
            <ce-icon name="arrow-up" />
            <ce-icon name="arrow-down-circle" />
            <ce-icon name="thumbs-up" />
            <ce-icon name="share" />
            <ce-icon name="external-link" />
            <ce-icon name="download" />
            <ce-icon name="save" />
            <ce-icon name="link" />
            <ce-icon name="user" />
            <ce-icon name="group" />
            <ce-icon name="eye" />
            <ce-icon name="user" />
            <ce-icon name="file-minus" />
            <ce-icon name="wifi" />
            <ce-icon name="camera" />
            <ce-icon name="volume-2" />
            <ce-icon name="edit" />
            <ce-icon name="zoom-in" />
            <ce-icon name="at-sign" />
            <ce-icon name="pie-chart" />
            <ce-icon name="tag" />
            <ce-icon name="smartphone" />
            <ce-icon name="shopping-cart" />
            <ce-colorful-icon name="check-mark-f" />
            <ce-colorful-icon name="alert-circle-f" />
            <ce-colorful-icon name="key-rethink-the-business-model" />
            <ce-colorful-icon name="key-incorporate-digital-technology" />
            <ce-colorful-icon name="key-strengthen-and-advance-knowledge" />
            <ce-colorful-icon name="key-team-up-to-create-joint-value" />
          </div>
        </div>
      </div>
      <!-- Buttons -->
      <div class="my-16">
        <p
          class="
            bg-blue-500
            w-fll
            h-14
            mx-auto
            text-5xl text-white text-center
            font-Rubik
          "
        >
          Buttons
        </p>
        <!-- Primary Button -->
        <div class="my-8 flex">
          <div class="w-36 text-2xl mr-16">Primary</div>
          <div>
            <ce-button>Button</ce-button>
            <ce-button left-icon="arrow-down-circle">Button</ce-button>
            <ce-button right-icon="arrow-right">Button</ce-button>
            <ce-button disabled>Button</ce-button>
            <ce-button left-icon="arrow-down-circle" disabled>Button</ce-button>
            <ce-button right-icon="arrow-right" disabled>Button</ce-button>
          </div>
        </div>
        <!-- Secondary button  -->
        <div class="my-8 flex">
          <div class="w-36 text-2xl mr-16">Secondary</div>
          <div>
            <ce-button theme="secondary">Button</ce-button>
            <ce-button theme="secondary" left-icon="arrow-down-circle">
              Button
            </ce-button>
            <ce-button theme="secondary" right-icon="arrow-right">
              Button
            </ce-button>
            <ce-button theme="secondary" disabled>Button</ce-button>
            <ce-button theme="secondary" left-icon="arrow-down-circle" disabled>
              Button
            </ce-button>
            <ce-button theme="secondary" right-icon="arrow-right" disabled>
              Button
            </ce-button>
          </div>
        </div>
        <!-- Tertiary button -->
        <div class="my-8 flex">
          <div class="w-36 text-2xl mr-16">Tertiary</div>
          <div>
            <ce-button theme="tertiary">Button</ce-button>
            <ce-button theme="tertiary" left-icon="arrow-down-circle">
              Button
            </ce-button>
            <ce-button theme="tertiary" right-icon="arrow-right">
              Button
            </ce-button>
            <ce-button theme="tertiary" disabled>Button</ce-button>
            <ce-button theme="tertiary" left-icon="arrow-down-circle" disabled>
              Button
            </ce-button>
            <ce-button theme="tertiary" right-icon="arrow-right" disabled>
              Button
            </ce-button>
          </div>
        </div>
      </div>
      <!-- Colors -->
      <div class="my-16">
        <p
          class="
            bg-blue-500
            w-fll
            h-14
            mx-auto
            text-5xl text-white text-center
            font-Rubik
          "
        >
          Colors
        </p>
        <div class="my-8 flex items-center">
          <div class="w-36 text-2xl mr-16">Primary/Purple</div>
          <div class="flex">
            <div class="bg-kh-primary-50 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-primary-100 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-primary-200 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-primary-300 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-primary-400 w-13.5 h-13.5 rounded-xl m-4" />
          </div>
        </div>
        <div class="my-8 flex items-center">
          <div class="w-36 text-2xl mr-16">Grey</div>
          <div class="flex">
            <div class="bg-kh-grey-100 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-grey-200 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-grey-300 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-grey-400 w-13.5 h-13.5 rounded-xl m-4" />
          </div>
        </div>
        <div class="my-8 flex items-center">
          <div class="w-36 text-2xl mr-16 break-all">
            Yellow/White /BlueGrey
          </div>
          <div class="flex">
            <div class="bg-kh-yellow w-13.5 h-13.5 rounded-xl m-4" />
            <div
              class="
                bg-white
                w-13.5
                h-13.5
                rounded-xl
                m-4
                border-gray-200 border-2
              "
            ></div>
            <div class="bg-kh-blue-grey-100 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-blue-grey-200 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-blue-grey-300 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-blue-grey-400 w-13.5 h-13.5 rounded-xl m-4" />
            <div class="bg-kh-blue-grey-500 w-13.5 h-13.5 rounded-xl m-4" />
          </div>
        </div>
      </div>
      <!-- Components -->
      <div class="my-16">
        <p
          class="
            bg-blue-500
            h-14
            my-16
            text-5xl text-white text-center
            font-Rubik
          "
        >
          Components
        </p>
        <!-- Atoms -->
        <div class="my-8">
          <p
            class="
              bg-blue-500
              w-[600px]
              h-14
              text-5xl text-white text-center
              font-Rubik
              my-16
            "
          >
            Atoms
          </p>
          <!-- CeCard -->
          <div class="my-8">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeCard
            </p>
            <div class="w-64">
              <ce-card />
            </div>
          </div>
          <!-- CeCheckBox -->
          <div class="my-8">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeCheckbox
            </p>
            <div class="hover-child">
              <ce-checkbox
                v-model="checkboxArray"
                name="165"
                class="fake-hover mr-4"
                control
              ></ce-checkbox>
              <ce-checkbox
                v-model="checkboxArray"
                name="166"
                class="fake-hover"
                control
              ></ce-checkbox>
            </div>
          </div>
          <!-- CeRadio -->
          <div class="my-8">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeRadio
            </p>
            <div class="flex">
              <ce-radio
                v-model="ceRadioValue"
                class="mr-4 align-top"
                name="name1"
                control
              ></ce-radio>
              <ce-radio
                v-model="ceRadioValue"
                name="name2"
                control
                class="align-top"
              ></ce-radio>
            </div>
          </div>
          <!-- CeHalfPxLine -->
          <div class="my-8">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeHalfPxLine
            </p>
            <div class="w-64">
              <ce-half-px-line class="bg-kh-yellow">
                Test CeHalfPxLine
              </ce-half-px-line>
            </div>
          </div>
          <!-- CeImage -->
          <div class="my-8 w-40">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeImage
            </p>
            <ce-image
              :src="require(`~/assets/images/knowledge-hub-logo.png`)"
            ></ce-image>
          </div>
          <!-- CeInput -->
          <div class="my-8">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeInput
            </p>
            <ce-input
              v-model="valueInput"
              type="textarea"
              rows="1"
              class="mb-8"
            ></ce-input>
            <ce-input v-model="valueInput" type="textarea" rows="5"></ce-input>
          </div>
          <!-- CeItemCard -->
          <div class="my-8">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeItemCard
            </p>
            <ce-item-card class="w-64 h-64" />
          </div>
          <!-- CeScoreCircle -->
          <div class="my-8">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeScoreCircle
            </p>
            <div class="flex items-center">
              <ce-score-circle class="mr-8" />
              <ce-score-circle :score="70" class="mr-8" />
              <ce-score-circle :score="100" class="mr-8" />
              <ce-score-circle bar-background-color="grey" class="mr-8" />
              <ce-score-circle :diam="126" class="mr-8" />
              <ce-score-circle :stroke-width="30" class="mr-8" />
            </div>
          </div>
          <!-- CeProgressLine -->
          <div class="my-8">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeProgressLine
            </p>
            <ul>
              <li class="w-64 h-6 my-8"><ce-progress-line /></li>
              <li class="w-64 h-6 my-8">
                <ce-progress-line :progress="70" />
              </li>
              <li class="w-64 h-6 my-8">
                <ce-progress-line :progress="100" />
              </li>
              <li class="w-64 h-6 my-8">
                <ce-progress-line bar-background-color="grey" />
              </li>
            </ul>
          </div>
          <!-- CeSkeleton -->
          <div class="my-8 w-32">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              CeSkeleton
            </p>
            <div class="w-32 h-32">
              <ce-skeleton class="w-full h-full"></ce-skeleton>
            </div>
          </div>
          <!-- DropdownItem -->
          <div class="my-8">
            <p
              class="
                bg-blue-500
                w-[400px]
                h-10
                text-3xl text-white text-center
                font-Rubik
                my-8
              "
            >
              DropdownItem
            </p>
            <div class="w-32">
              <dropdown-item text="Test" icon="1"></dropdown-item>
            </div>
          </div>
        </div>
        <!-- Molecules -->
        <div class="my-8">
          <p
            class="
              bg-blue-500
              w-[600px]
              h-14
              text-5xl text-white text-center
              font-Rubik
              my-16
            "
          >
            Molecules
          </p>
          <div class="my-8">
            <!-- AppFooter -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                AppFooter
              </p>
              <app-footer />
            </div>
            <!-- AssessmentCard -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                AssessmentCard
              </p>
              <assessment-card
                image="https://ast-cms-dev.circle-lab.com/uploads/601c4bb7211a39f745792d52_Diagram_p_500_2_4b0d8d10e8.png"
                :assessment-id="cardTestData.id"
                :card-title="cardTestData.name"
                :key-element="cardTestData.keyElement"
                :progress="cardTestData.progress"
                :score="cardTestData.score"
              />
            </div>
            <!-- AssessmentExpandCard -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                AssessmentExpandCard
              </p>
              <assessment-expand-card />
            </div>
            <!-- CaseStudyCard -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                CaseStudyCard
              </p>
              <case-study-card
                text="Test CaseStudyCard Test CaseStudyCard Test Test Test CaseStudyCard  Test Test CaseStudy Test Test CaseStudy Test Test CaseStudy Test CaseStudyCard"
                :image="require(`~/assets/images/assessment-img.png`)"
              ></case-study-card>
            </div>
            <!-- CeCardWithProgress -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                CeCardWithProgress
              </p>
              <ce-card-with-progress :item="ceCardItem"></ce-card-with-progress>
            </div>
            <!-- CeItem -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                CeItem
              </p>
              <div class="w-64">
                <ce-item />
              </div>
            </div>
            <!-- CollapseFramework -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                CollapseFramework
              </p>
              <collapse-framework></collapse-framework>
            </div>
            <!-- DropdownContent -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                DropdownContent
              </p>
              <div class="w-64">
                <dropdown-content
                  header="userName"
                  :list="dropdownContentList"
                ></dropdown-content>
              </div>
            </div>
            <!-- HeaderUserButton -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                HeaderUserButton
              </p>
              <header-user-button />
            </div>
            <!-- SignIn -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                SignIn
              </p>
              <sign-in />
            </div>
            <!-- SurveyAnswerRadio -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                SurveyAnswerRadio
              </p>
              <div class="h-24">
                <survey-answer-radio
                  v-model="surveyAnswerRadioValue"
                  class="mr-8 align-top"
                  text="Test1"
                  :index="1"
                ></survey-answer-radio>
                <survey-answer-radio
                  v-model="surveyAnswerRadioValue"
                  class="align-top"
                  text="Test2"
                  :index="2"
                ></survey-answer-radio>
              </div>
            </div>
            <!-- SurveyChallengesCheckbox -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                SurveyChallengesCheckbox
              </p>
              <div class="w-[400px] h-54">
                <survey-challenges-checkbox
                  v-model="checkboxArray"
                  name="Other"
                  class="mb-8"
                ></survey-challenges-checkbox>
                <survey-challenges-checkbox
                  v-model="checkboxArray"
                  name="TestSurveyChallengesCheckbox"
                ></survey-challenges-checkbox>
              </div>
            </div>
            <!-- SurveyCard -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                SurveyCard
              </p>
              <div class="w-72 h-64">
                <survey-card
                  title="Test SurveyCard"
                  sub-title="Test SurveyCard"
                />
              </div>
            </div>
            <!-- SurveyScoreCircle -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                SurveyScoreCircle
              </p>
              <div class="flex items-center flex-wrap mr-4 w-3/4">
                <survey-score-circle class="mr-8 mb-8" />
                <survey-score-circle :score="70" class="mr-8 mb-8" />
                <survey-score-circle :score="100" class="mr-8 mb-8" />
                <survey-score-circle
                  bar-background-color="grey"
                  class="mr-8 mb-8"
                />
                <survey-score-circle :diam="126" small-text class="mr-8 mb-8" />
                <survey-score-circle :stroke-width="30" class="mr-8 mb-8" />
              </div>
            </div>
            <!-- SurveyProgressLine -->
            <div class="my-8">
              <p
                class="
                  bg-blue-500
                  w-[400px]
                  h-10
                  text-3xl text-white text-center
                  font-Rubik
                  my-8
                "
              >
                SurveyProgressLine
              </p>
              <ul>
                <li class="w-64 h-6 my-12"><survey-progress-line /></li>
                <li class="w-64 h-6 my-12">
                  <survey-progress-line :progress="70" />
                </li>
                <li class="w-64 h-6 my-12">
                  <survey-progress-line :progress="100" />
                </li>
                <li class="w-64 h-6 my-12">
                  <survey-progress-line bar-background-color="grey" />
                </li>
                <li class="w-64 h-6 my-12">
                  <survey-progress-line small-text />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import CeFinePrint from '~/components/atoms/CeFinePrint.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeLink from '~/components/atoms/CeLink.vue'
import CeLogo from '~/components/atoms/CeLogo.vue'
import CeMenuItem from '~/components/atoms/CeMenuItem.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeTabLabel from '~/components/atoms/CeTabLabel.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'
import CeColorfulIcon from '~/components/atoms/CeColorfulIcon.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeCard from '~/components/atoms/CeCard.vue'
import CeCheckbox from '~/components/atoms/CeCheckbox.vue'
import CeHalfPxLine from '~/components/atoms/CeHalfPxLine.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeInput from '~/components/atoms/CeInput.vue'
import CeItemCard from '~/components/atoms/CeItemCard.vue'
import CeScoreCircle from '~/components/atoms/CeScoreCircle.vue'
import CeProgressLine from '~/components/atoms/CeProgressLine.vue'
import CeRadio from '~/components/atoms/CeRadio.vue'
import CeSkeleton from '~/components/atoms/CeSkeleton.vue'
import DropdownItem from '~/components/atoms/DropdownItem.vue'
import AppFooter from '~/components/molecules/AppFooter.vue'
import AssessmentCard from '~/components/molecules/AssessmentCard.vue'
import AssessmentExpandCard from '~/components/molecules/AssessmentExpandCard.vue'
import CaseStudyCard from '~/components/molecules/CaseStudyCard.vue'
import CeCardWithProgress from '~/components/molecules/CeCardWithProgress.vue'
import CeItem from '~/components/molecules/CeItem.vue'
import CollapseFramework from '~/components/molecules/CollapseFramework.vue'
import DropdownContent from '~/components/molecules/DropdownContent.vue'
import HeaderUserButton from '~/components/molecules/HeaderUserButton.vue'
import SignIn from '~/components/molecules/SignIn.vue'
import SurveyAnswerRadio from '~/components/molecules/SurveyAnswerRadio.vue'
import SurveyCard from '~/components/molecules/SurveyCard.vue'
import SurveyChallengesCheckbox from '~/components/molecules/SurveyChallengesCheckbox.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
export default defineComponent({
  name: 'DesignIndex',
  components: {
    CeHeading1,
    CeHeading2,
    CeHeading3,
    CeHeading4,
    CeHeading5,
    CeP,
    CeSmallText,
    CeFinePrint,
    CeLogo,
    CeTabLabel,
    CeMenuItem,
    CeLink,
    CeIcon,
    CeColorfulIcon,
    CeButton,
    CeCard,
    CeCheckbox,
    CeHalfPxLine,
    CeImage,
    CeInput,
    CeItemCard,
    CeScoreCircle,
    CeProgressLine,
    CeRadio,
    CeSkeleton,
    DropdownItem,
    AppFooter,
    AssessmentCard,
    AssessmentExpandCard,
    CaseStudyCard,
    CeCardWithProgress,
    CeItem,
    CollapseFramework,
    DropdownContent,
    HeaderUserButton,
    SignIn,
    SurveyAnswerRadio,
    SurveyCard,
    SurveyChallengesCheckbox,
    SurveyScoreCircle,
    SurveyProgressLine,
  },
  setup() {
    const checkboxArray: string[] = reactive([
      '166',
      'TestSurveyChallengesCheckbox',
    ])
    const ceCardItem: {} = reactive({
      1: 'test ceCardItem',
    })
    const cardTestData = reactive({
      id: 1,
      name: 'a-new-assessment-test',
      keyElement: 'Framework: Key Elements of the circular economy',
      progress: 0,
      score: 0,
    })
    const valueInput = ref('')
    const ceRadioValue = ref('name2')
    const surveyAnswerRadioValue = ref('2')
    const dropdownContentList = reactive([
      { name: 'update', text: 'Update my profile', icon: 'user' },
      { name: 'signOut', text: 'Sign out', icon: 'power' },
    ])
    return {
      checkboxArray,
      ceCardItem,
      ceRadioValue,
      cardTestData,
      dropdownContentList,
      valueInput,
      surveyAnswerRadioValue,
    }
  },
})
</script>
<style scoped>
.hover-child:hover .fake-hover {
  border-color: #593ccf;
}
</style>
