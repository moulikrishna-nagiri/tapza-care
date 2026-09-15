import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useAppTheme } from '@/theme/app-theme';

export default function AppTabs() {
  const { theme } = useAppTheme();
  const colors = theme.colors;

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.background}
      iconColor={{ default: colors.mutedText, selected: colors.primary }}
      labelStyle={{ default: { color: colors.mutedText }, selected: { color: colors.primary } }}
      backBehavior="initialRoute">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md={{ default: 'home', selected: 'home' }}
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="bookings">
        <NativeTabs.Trigger.Label>Bookings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'calendar', selected: 'calendar' }}
          md={{ default: 'calendar_month', selected: 'calendar_month' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="prescriptions">
        <NativeTabs.Trigger.Label>Prescriptions</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'cross.case', selected: 'cross.case.fill' }}
          md={{ default: 'medication', selected: 'medication' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          md={{ default: 'person', selected: 'person' }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
