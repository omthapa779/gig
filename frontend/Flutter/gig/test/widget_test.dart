import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gig/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verify that the BottomNavigationBar is present
    expect(find.byIcon(Icons.home), findsOneWidget);
    expect(
      find.byIcon(Icons.mail),
      findsOneWidget,
    ); // Assuming 0 index is selected, or initial state
    // Note: In main.dart, the unselected icon for index 1 is mail_outlined.
    // If _selectedIndex is 0, then:
    // 0: home (filled)
    // 1: mail_outlined
    // 2: description_outlined
    // 3: person_outlined

    // Let's verify presence of BottomNavigationBar icons.
    expect(find.byType(BottomNavigationBar), findsOneWidget);

    // Verify Home Screen content
    expect(find.text('New Briefs'), findsOneWidget);
    expect(find.text('Earnings'), findsOneWidget);
    expect(find.text('To-dos'), findsOneWidget);
    expect(find.text('My Gigs'), findsOneWidget);
  });
}
