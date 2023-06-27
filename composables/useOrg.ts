import { useRequest } from '@use/useRequest'
import { useFetchUserinfo } from '~/api/auth'
import {
  useCreateOrganisation,
  useFetchOrganisations,
  useUpdateOrganisation,
} from '~/api/organisation'
import { ID } from '~/type/base'

export const useOrg = () => {
  const fetchUserinfo = useFetchUserinfo()
  const fetchOrg = useFetchOrganisations()
  const updateOrg = useUpdateOrganisation()
  const createOrg = useCreateOrganisation()
  return useRequest(
    async () => {
      const userinfo = await fetchUserinfo()
      const userOrgFromAccount = userinfo.organizations
      const idMap: Record<ID, ID> = {}
      if (userOrgFromAccount && userOrgFromAccount.length) {
        const { data, error } = await fetchOrg({
          ids: userOrgFromAccount.map((i) => i.organizationId + ''),
        })
        if (error) throw error
        data?.organisations.forEach((item) => {
          const { id, orgId } = item
          idMap[orgId] = id
        })
        for (const item of userOrgFromAccount) {
          const { organizationId, organizationName, organizationPhotoPath } =
            item
          if (idMap[organizationId]) {
            await updateOrg({
              id: idMap[organizationId] + '',
              orgName: organizationName,
              orgPhoto: organizationPhotoPath,
              orgId: organizationId + '',
            })
          } else {
            await createOrg({
              orgName: organizationName,
              orgPhoto: organizationPhotoPath,
              orgId: organizationId + '',
            })
          }
        }
      }
    },
    {
      immediate: false,
    }
  )
}
