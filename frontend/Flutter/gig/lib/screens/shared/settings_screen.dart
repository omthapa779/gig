import 'package:flutter/material.dart';
import '../../main.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final textColor = theme.textTheme.bodyLarge?.color;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Preferences'),
        backgroundColor: theme.scaffoldBackgroundColor,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: textColor),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      body: ListView(
        children: [
          _buildListItem(
            context,
            'Notifications',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => const NotificationsSettingsScreen(),
                ),
              );
            },
          ),
          _buildListItem(
            context,
            'Security',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => const SecuritySettingsScreen(),
                ),
              );
            },
          ),
          _buildListItem(
            context,
            'Language',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => const LanguageSettingsScreen(),
                ),
              );
            },
          ),
          _buildListItem(
            context,
            'Appearance',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => const AppearanceSettingsScreen(),
                ),
              );
            },
          ),
          _buildListItem(
            context,
            'Briefs',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => const BriefsSettingsScreen(),
                ),
              );
            },
          ),
          _buildListItem(
            context,
            'Currency',
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => const CurrencySettingsScreen(),
                ),
              );
            },
          ),

          const Divider(),
          SwitchListTile(
            title: Text(
              'Online status',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              "You'll remain Online for as long as the app is open.",
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
            value: true, // Mock value
            onChanged: (val) {},
            activeThumbColor: Colors.white,
            activeTrackColor: Colors.grey,
          ),
          const Divider(),
          ListTile(
            title: Text(
              'Switch to Company',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            trailing: Icon(
              Icons.business,
              color: isDark ? Colors.grey[400] : Colors.grey[600],
            ),
            onTap: () {},
          ),

          const Divider(),
          SwitchListTile(
            title: Text(
              'Dark Mode',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            value: isDark,
            onChanged: (value) {
              final newThemeMode = value ? ThemeMode.dark : ThemeMode.light;
              MyApp.of(context)?.changeTheme(newThemeMode);
            },
            secondary: Icon(Icons.dark_mode_outlined, color: textColor),
            activeThumbColor: const Color(0xFFFFD021),
          ),
        ],
      ),
    );
  }

  Widget _buildListItem(
    BuildContext context,
    String title, {
    VoidCallback? onTap,
  }) {
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return ListTile(
      title: Text(
        title,
        style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
      ),
      trailing: Icon(
        Icons.chevron_right,
        color: isDark ? Colors.grey[500] : Colors.grey[400],
      ),
      onTap: onTap,
    );
  }
}

class NotificationsSettingsScreen extends StatelessWidget {
  const NotificationsSettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color;
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        backgroundColor: theme.scaffoldBackgroundColor,
        elevation: 0,
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      body: ListView(
        children: [
          SwitchListTile(
            title: Text(
              'Push notifications',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'Get notified about orders, messages, and updates.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
            value: true,
            onChanged: (_) {},
          ),
          SwitchListTile(
            title: Text(
              'Email notifications',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'Receive summaries and important updates via email.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
            value: false,
            onChanged: (_) {},
          ),
          SwitchListTile(
            title: Text(
              'Marketing updates',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'Be the first to know about new features and offers.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
            value: true,
            onChanged: (_) {},
          ),
        ],
      ),
    );
  }
}

class SecuritySettingsScreen extends StatelessWidget {
  const SecuritySettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color;
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Security'),
        backgroundColor: theme.scaffoldBackgroundColor,
        elevation: 0,
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      body: ListView(
        children: [
          ListTile(
            title: Text(
              'Change password',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'Update your account password.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {},
          ),
          const Divider(),
          SwitchListTile(
            title: Text(
              'Two-factor authentication',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'Add an extra layer of security to your account.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
            value: false,
            onChanged: (_) {},
          ),
        ],
      ),
    );
  }
}

class LanguageSettingsScreen extends StatelessWidget {
  const LanguageSettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color;
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Language'),
        backgroundColor: theme.scaffoldBackgroundColor,
        elevation: 0,
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      body: ListView(
        children: [
          RadioListTile<String>(
            title: Text(
              'English',
              style: TextStyle(color: textColor),
            ),
            value: 'en',
            groupValue: 'en',
            onChanged: (_) {},
          ),
          RadioListTile<String>(
            title: Text(
              'Spanish',
              style: TextStyle(color: textColor),
            ),
            value: 'es',
            groupValue: 'en',
            onChanged: (_) {},
          ),
          RadioListTile<String>(
            title: Text(
              'French',
              style: TextStyle(color: textColor),
            ),
            value: 'fr',
            groupValue: 'en',
            onChanged: (_) {},
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'More languages coming soon.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class AppearanceSettingsScreen extends StatelessWidget {
  const AppearanceSettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color;
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Appearance'),
        backgroundColor: theme.scaffoldBackgroundColor,
        elevation: 0,
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      body: ListView(
        children: [
          ListTile(
            title: Text(
              'Theme',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'Switch between light and dark mode from the main Preferences screen.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
          ),
          const Divider(),
          ListTile(
            title: Text(
              'Font size',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'Adjust font size (coming soon).',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class BriefsSettingsScreen extends StatelessWidget {
  const BriefsSettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color;
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Briefs'),
        backgroundColor: theme.scaffoldBackgroundColor,
        elevation: 0,
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      body: ListView(
        children: [
          ListTile(
            title: Text(
              'Saved briefs',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'View and manage your saved buyer briefs.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {},
          ),
          const Divider(),
          ListTile(
            title: Text(
              'Brief preferences',
              style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              'Control how briefs appear in your feeds.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
                fontSize: 12,
              ),
            ),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {},
          ),
        ],
      ),
    );
  }
}

class CurrencySettingsScreen extends StatelessWidget {
  const CurrencySettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final textColor = theme.textTheme.bodyLarge?.color;
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Currency'),
        backgroundColor: theme.scaffoldBackgroundColor,
        elevation: 0,
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      body: ListView(
        children: [
          RadioListTile<String>(
            title: Text(
              'USD - US Dollar',
              style: TextStyle(color: textColor),
            ),
            value: 'USD',
            groupValue: 'USD',
            onChanged: (_) {},
          ),
          RadioListTile<String>(
            title: Text(
              'EUR - Euro',
              style: TextStyle(color: textColor),
            ),
            value: 'EUR',
            groupValue: 'USD',
            onChanged: (_) {},
          ),
          RadioListTile<String>(
            title: Text(
              'GBP - British Pound',
              style: TextStyle(color: textColor),
            ),
            value: 'GBP',
            groupValue: 'USD',
            onChanged: (_) {},
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Your selected currency will be used for prices and balances across Gig.',
              style: TextStyle(
                color: isDark ? Colors.grey[400] : Colors.grey[600],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
