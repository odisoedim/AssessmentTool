import { ref } from '@nuxtjs/composition-api'
import { mount } from '@vue/test-utils'
import { expectText } from '~/test/helper/expect'
import { renderAssessment } from '~/test/helper/mockData'
import { nextTick } from '~/test/helper/nextTick'
const useOrgAssessments = jest.fn()

jest.mock('~/pages-helper/assessment/organisations/index', () => ({
  useOrgAssessments: () => useOrgAssessments(),
}))
useOrgAssessments.mockReturnValue(
  ref([
    {
      orgId: 7002,
      orgName: 'Bazaks',
      orgImg: null,
      orgAssessments: renderAssessment(2),
      completed: true,
      progress: 100,
      score: 63,
    },
    {
      orgId: 8087,
      orgName: 'Business Collection',
      orgImg: null,
      orgAssessments: renderAssessment(2),
      completed: false,
      progress: 29,
      score: 44,
    },
  ])
)

describe('useOrgAssessments', () => {
  it('can fetch all assessments', async () => {
    const wrap = mount({
      template: `
        <div>
          <div v-for='item in allOrgAssessments' :key='item.id'>
          <span class='orgId'>{{ item.orgId }}</span>
          <span class='orgName'>{{ item.orgName }}</span>
            <span class='score'>{{ item.score }}</span>
            <span class='progress'>{{ item.progress }}</span>
            <span class='completed'>{{ item.completed }}</span>
          </div>
        </div>`,
      setup() {
        const allOrgAssessments = useOrgAssessments()

        return {
          allOrgAssessments,
        }
      },
    })
    await nextTick(wrap, 1)
    expectText(wrap.findAll('.score').at(0), '63')
    expectText(wrap.findAll('.score').at(1), '44')
    expectText(wrap.findAll('.orgName').at(0), 'Bazaks')
    expectText(wrap.findAll('.orgName').at(1), 'Business Collection')
    expectText(wrap.findAll('.progress').at(0), '100')
    expectText(wrap.findAll('.progress').at(1), '29')
  })
})
