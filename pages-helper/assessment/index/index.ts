import { computed } from '@nuxtjs/composition-api'
// hooks
import { useAssessmentsAndSurvey } from '~/pages-helper/assessment/index/fetchAssessments'
import { SubStrategyInput } from '~/pages-helper/assessment/survey/createPage'

// type
import { AssessmentLevel, Completion } from '~/type/enum'
import { AnswersStore } from '~/type/schema/answersStore'
import { ID } from '~/type/base'

// utils
import { NOT_APPLICABLE } from '~/util/static'

const calcProgress = (
  map: Record<string, Record<string, Completion>>,
  progressMap: Record<string, Completion>
) => {
  Object.keys(map).forEach((id) => {
    const _progress = {
      total: 0,
      finish: 0,
    }
    Object.values(map[id]).forEach((completion) => {
      switch (completion) {
        case Completion.NotStart:
        case Completion.Start:
          _progress.total++
          break
        case Completion.Finish:
          _progress.total++
          _progress.finish++
          break
      }
    })
    if (_progress.total) {
      progressMap[id] = Math.round((_progress.finish / _progress.total) * 100)
    } else {
      progressMap[id] = -1
    }
  })
  return progressMap
}
export const useAssessments = (orgId?: ID) => {
  const { result, loading, error } = useAssessmentsAndSurvey(orgId)

  const assessments = computed(
    () =>
      /* istanbul ignore next */ result.value?.assessmentsData?.assessments ||
      []
  )

  const demoAssessments = computed(
    () =>
      /* istanbul ignore next */ result.value?.demoAssessmentsData
        ?.demoAssessments || []
  )
  const answers = computed(
    () =>
      /* istanbul ignore next */ result.value?.answersData?.answersStores || []
  )

  const demoAnswers = computed(
    () =>
      /* istanbul ignore next */ result.value?.demoAnswersData
        ?.demoAnswersStores || []
  )
  const score = computed(
    () => /* istanbul ignore next */ result.value?.scoreData || {}
  )
  const demoScore = computed(
    () => /* istanbul ignore next */ result.value?.demoScoreData || {}
  )
  const elements = computed(
    () =>
      /* istanbul ignore next */ result.value?.elementsData
        ?.frameworkElements || []
  )
  const frameworks = computed(() => {
    const map: Record<string, string> = {}
    elements.value.forEach(({ framework: { id, name } }) => {
      map[id] = name
    })
    return map
  })

  const Tier3 = computed(() => {
    const map: Record<string, Record<string, Completion>> = {}
    assessments.value.forEach(({ id, framework_id }) => {
      if (!map[id]) map[id] = {}
      const answersMap: Record<string, AnswersStore> = {}
      answers.value
        .filter((answer) => +answer.assessment.id === +id)
        .forEach((answer) => {
          answersMap[answer.surveyId] = answer
        })

      elements.value
        .filter((element) => +element.framework.id === +framework_id)
        .forEach((element) => {
          if (!answersMap[element.id]) {
            map[id][element.id] = Completion.NotStart
          } else if (answersMap[element.id].completed) {
            map[id][element.id] = Completion.Finish
          } else if (
            answersMap[element.id].progress.circleStrategies.length === 0
          ) {
            map[id][element.id] = Completion.NotApplicable
          } else {
            map[id][element.id] = Completion.Start
          }
        })
    })
    const progressMap: Record<string, number> = {}
    calcProgress(map, progressMap)

    const assessmentFrozenBy = answers.value[0]?.progress?.userProfileInfo || {}
    const assessmentLastEdited = answers.value.length
      ? answers.value[0].updated
      : ''

    return (
      assessments.value.map((assessment) => ({
        ...assessment,
        userProfileInfo: assessmentFrozenBy,
        lastEdited: assessmentLastEdited,
        progress: progressMap[assessment.id] || 0,
        score: score.value[assessment.id]?.score || 0,
        frameworks: frameworks.value[assessment.framework_id],
      })) || []
    )
  })

  const Tier1 = computed(() => {
    const map: Record<string, Record<string, Completion>> = {}
    const progressMap: Record<string, number> = {}
    demoAssessments.value.forEach(({ id, framework_id }) => {
      const answer = demoAnswers.value.find(
        (_answer) => +_answer.demo_assessment.id === +id
      )
      if (!answer) {
        progressMap[id] = 0
      } else {
        if (!map[id]) map[id] = {}
        elements.value
          .filter((element) => +element.framework.id === +framework_id)
          .forEach((element) => {
            if (
              answer.data[element.id] &&
              (answer.data[element.id] as SubStrategyInput).option
            ) {
              const option = +(answer.data[element.id] as SubStrategyInput)
                .option
              if (option === -1) {
                map[id][element.id] = Completion.NotStart
              } else if (option === NOT_APPLICABLE) {
                map[id][element.id] = Completion.NotApplicable
              } else {
                map[id][element.id] = Completion.Finish
              }
            } else {
              map[id][element.id] = Completion.NotStart
            }
          })
      }
    })
    calcProgress(map, progressMap)

    const DassessmentFrozenBy =
      demoAnswers.value[0]?.progress?.userProfileInfo || {}
    const DassessmentLastEdited = demoAnswers.value.length
      ? demoAnswers.value[0].updated
      : ''

    return (
      demoAssessments.value.map((assessment) => ({
        ...assessment,
        userProfileInfo: DassessmentFrozenBy,
        lastEdited: DassessmentLastEdited,
        progress: progressMap[assessment.id] || 0,
        score: demoScore.value[assessment.id] || 0,
        tier: AssessmentLevel.Tier1,
        frameworks: frameworks.value[assessment.framework_id],
      })) || []
    )
  })
  const assessmentsByOrder = computed(() => {
    const arr = [...Tier3.value, ...Tier1.value]
    arr.sort((a, b) => a.progress - b.progress)
    return arr
  })

  return {
    assessments: assessmentsByOrder,
    answers,
    loading,
    error,
    elements,
  }
}
