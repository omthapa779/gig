import 'package:flutter/material.dart';
import 'settings_screen.dart';
import '../freelancer/seller/profile_screens/earnings_screen.dart';
import '../freelancer/seller/profile_screens/offer_templates_screen.dart';
import '../freelancer/seller/profile_screens/briefs_screen.dart';
import '../freelancer/seller/profile_screens/share_gigs_screen.dart';
import '../freelancer/seller/profile_screens/manage_gigs_screen.dart';
import '../freelancer/seller/profile_screens/availability_screen.dart';
import '../freelancer/seller/profile_screens/account_screen.dart';
import '../freelancer/seller/profile_screens/seller_public_profile_screen.dart';

class ProfileScreen extends StatelessWidget {
  final bool isSellerMode;
  final ValueChanged<bool> onToggleMode;

  const ProfileScreen({
    super.key,
    required this.isSellerMode,
    required this.onToggleMode,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final textColor = theme.textTheme.bodyLarge?.color;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Stack(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: isDark
                              ? Colors.grey[800]
                              : const Color(0xFFE5E7EB),
                          child: Icon(
                            Icons.person,
                            size: 30,
                            color: isDark
                                ? Colors.grey[400]
                                : const Color(0xFF9CA3AF),
                          ),
                          // backgroundImage: NetworkImage('url'),
                        ),
                        Positioned(
                          right: 0,
                          bottom: 0,
                          child: Container(
                            width: 12,
                            height: 12,
                            decoration: BoxDecoration(
                              color: Colors.green,
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: theme.scaffoldBackgroundColor,
                                width: 2,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'John Doe',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: textColor,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Personal balance: \$0',
                          style: TextStyle(
                            fontSize: 14,
                            color:
                                theme.textTheme.bodySmall?.color ?? Colors.grey,
                          ),
                        ),
                      ],
                    ),
                    const Spacer(),
                    IconButton(
                      icon: Icon(
                        Icons.notifications_outlined,
                        color: textColor,
                      ),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),

              // Seller Mode Switch
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 12,
                ),
                decoration: BoxDecoration(
                  color: isDark ? const Color(0xFF1F2937) : Colors.black87,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Seller mode',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Switch(
                      value: isSellerMode,
                      onChanged: onToggleMode,
                      activeColor: Colors.white,
                      activeTrackColor: Colors.grey,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Sections
              _buildSectionTitle(context, isSellerMode ? 'Selling' : 'Buying'),
              if (isSellerMode) ...[
                _buildListItem(
                  context,
                  Icons.monetization_on_outlined,
                  'Earnings',
                  onTap: () => Navigator.of(
                    context,
                  ).push(_createRoute(const EarningsScreen())),
                ),
                _buildListItem(
                  context,
                  Icons.bolt_outlined,
                  'Custom offer templates',
                  onTap: () => Navigator.of(
                    context,
                  ).push(_createRoute(const OfferTemplatesScreen())),
                ),
                _buildListItem(
                  context,
                  Icons.article_outlined,
                  'Briefs',
                  onTap: () => Navigator.of(
                    context,
                  ).push(_createRoute(const BriefsScreen())),
                ),
                _buildListItem(
                  context,
                  Icons.share_outlined,
                  'Share Gigs',
                  onTap: () => Navigator.of(
                    context,
                  ).push(_createRoute(const ShareGigsScreen())),
                ),
                _buildListItem(
                  context,
                  Icons.person_outline,
                  'My profile',
                  onTap: () => Navigator.of(
                    context,
                  ).push(_createRoute(const SellerPublicProfileScreen())),
                ),
                _buildListItem(
                  context,
                  Icons.video_library_outlined,
                  'Manage Gigs',
                  onTap: () => Navigator.of(
                    context,
                  ).push(_createRoute(const ManageGigsScreen())),
                ),
                _buildListItem(
                  context,
                  Icons.calendar_today_outlined,
                  'Availability',
                  onTap: () => Navigator.of(
                    context,
                  ).push(_createRoute(const AvailabilityScreen())),
                ),
              ] else ...[
                _buildListItem(context, Icons.favorite_border, 'Saved Gigs'),
                _buildListItem(
                  context,
                  Icons.list_alt_outlined,
                  'Post a Request',
                ),
                _buildListItem(context, Icons.history, 'Browsing History'),
              ],
              _buildListItem(context, Icons.send_outlined, 'Invite friends'),

              const SizedBox(height: 24),
              _buildSectionTitle(context, 'Settings'),
              _buildListItem(
                context,
                Icons.settings_outlined,
                'Preferences',
                onTap: () {
                  Navigator.of(
                    context,
                  ).push(_createRoute(const SettingsScreen()));
                },
              ),
              _buildListItem(
                context,
                Icons.account_circle_outlined,
                'Account',
                onTap: () => Navigator.of(
                  context,
                ).push(_createRoute(const AccountScreen())),
              ),

              const SizedBox(height: 24),
              _buildSectionTitle(context, 'Resources'),
              _buildListItem(context, Icons.support_agent_outlined, 'Support'),
              _buildListItem(
                context,
                Icons.forum_outlined,
                'Community and legal',
              ),

              const SizedBox(height: 24),
              Center(
                child: Text(
                  '4.3.6.2',
                  style: TextStyle(
                    color: Colors.grey.withOpacity(0.5),
                    fontSize: 12,
                  ),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(BuildContext context, String title) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: Theme.of(context).textTheme.bodyLarge?.color,
        ),
      ),
    );
  }

  Widget _buildListItem(
    BuildContext context,
    IconData icon,
    String title, {
    VoidCallback? onTap,
  }) {
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;
    return ListTile(
      leading: Icon(icon, color: Colors.grey),
      title: Text(
        title,
        style: TextStyle(color: textColor, fontWeight: FontWeight.normal),
      ),
      trailing: const Icon(Icons.chevron_right, color: Colors.grey, size: 20),
      onTap: onTap,
    );
  }

  Route _createRoute(Widget page) {
    return PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) => page,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        const begin = Offset(1.0, 0.0);
        const end = Offset.zero;
        const curve = Curves.easeInOut;

        var tween = Tween(
          begin: begin,
          end: end,
        ).chain(CurveTween(curve: curve));

        return SlideTransition(position: animation.drive(tween), child: child);
      },
    );
  }
}
