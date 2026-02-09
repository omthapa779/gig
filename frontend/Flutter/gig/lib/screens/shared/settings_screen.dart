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
          _buildListItem(context, 'Notifications'),
          _buildListItem(context, 'Security'),
          _buildListItem(context, 'Language'),
          _buildListItem(context, 'Appearance'),
          _buildListItem(context, 'Briefs'),
          _buildListItem(context, 'Currency'),

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
            activeColor: Colors.white,
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
              MyApp.of(context).changeTheme(newThemeMode);
            },
            secondary: Icon(Icons.dark_mode_outlined, color: textColor),
            activeColor: const Color(0xFFFFD021),
          ),
        ],
      ),
    );
  }

  Widget _buildListItem(BuildContext context, String title) {
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
      onTap: () {
        // Navigation stub
      },
    );
  }
}
