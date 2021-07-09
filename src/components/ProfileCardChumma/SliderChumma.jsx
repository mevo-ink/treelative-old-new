import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels
} from '@chakra-ui/react'

import EditUserAvatar from 'components/EditUser/EditUserAvatar'
import EditUserFullName from 'components/EditUser/EditUserFullName'
import EditUserShortName from 'components/EditUser/EditUserShortName'
import EditUserEmail from 'components/EditUser/EditUserEmail'
import EditUserPhoneNumber from 'components/EditUser/EditUserPhoneNumber'

import EditUserDateOfDeath from 'components/EditUser/EditUserDateOfDeath'
import EditUserCurrentLocation from 'components/EditUser/EditUserCurrentLocation'
import EditUserDateOfBirth from 'components/EditUser/EditUserDateOfBirth'
import EditUserBirthLocation from 'components/EditUser/EditUserBirthLocation'
import EditUserParents from 'components/EditUser/EditUserParents'
import EditUserChildren from 'components/EditUser/EditUserChildren'
import EditUserPartner from 'components/EditUser/EditUserPartner'
import EditUserSocial from 'components/EditUser/EditUserSocial'
import EditUserSettings from 'components/EditUser/EditUserSettings'

export default function SliderChumma ({ user }) {
  const tabPanelProps = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center'
  }

  return (
    <Tabs isLazy orientation='vertical' size='sm' pb='4'>
      <TabList>
        <Tab>Avatar</Tab>
        <Tab>General</Tab>
        <Tab>Death</Tab>
        <Tab>Current</Tab>
        <Tab>Birth</Tab>
        <Tab>Parents</Tab>
        <Tab>Children</Tab>
        <Tab>Partner</Tab>
        <Tab>Social</Tab>
        <Tab>Settings</Tab>
      </TabList>

      <TabPanels outline='1px solid black'>
        <TabPanel {...tabPanelProps}>
          <EditUserAvatar user={user} />
        </TabPanel>
        <TabPanel {...tabPanelProps}>
          <EditUserFullName user={user} />
          <EditUserShortName user={user} />
          <EditUserEmail user={user} />
          <EditUserPhoneNumber user={user} />
        </TabPanel>
        <TabPanel {...tabPanelProps}>
          <EditUserDateOfDeath user={user} />
        </TabPanel>
        <TabPanel {...tabPanelProps}>
          <EditUserCurrentLocation user={user} />
        </TabPanel>
        <TabPanel {...tabPanelProps}>
          <EditUserDateOfBirth user={user} />
          <EditUserBirthLocation user={user} />
        </TabPanel>
        <TabPanel {...tabPanelProps}>
          <EditUserParents user={user} />
        </TabPanel>
        <TabPanel {...tabPanelProps}>
          <EditUserChildren user={user} />
        </TabPanel>
        <TabPanel {...tabPanelProps}>
          <EditUserPartner user={user} />
        </TabPanel>
        <TabPanel {...tabPanelProps}>
          <EditUserSocial user={user} />
        </TabPanel>
        <TabPanel {...tabPanelProps}>
          <EditUserSettings user={user} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
