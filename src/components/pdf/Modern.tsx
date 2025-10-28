
"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { GeneratedResume } from "@/types/GeneratedTypes";


// ---------------- PDF Styles ----------------
const pdfStyles = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#000",
  },
  contentWrapper: {
    width: 500, // limit content width
    alignSelf: "center", // center content on page
  },

  // ---------- Header Styles ----------
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
    paddingBottom: 6,
    marginBottom: 10,
  },
  name: {
    fontSize: 20, // text-2xl
    fontWeight: 700,
  },
  headline: {
    fontSize: 9, // text-sm
    color: "#4a4a4a",
    marginTop: 2,
  },
  contact: {
    fontSize: 9, // text-xs
    color: "#6a6a6a",
    marginTop: 2,
  },
  linksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },
  link: {
    fontSize: 9,
    color: "blue",
    textDecoration: "none",
  },

  // ---------- Section Header ----------
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#4a4a4a",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
    marginTop: 3,
    marginBottom: 6,
  },

  // ---------- Summary ----------
  summaryText: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 8,
  },

  // ---------- Experience / Education ----------
  itemContainer: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 11, // text-sm font-medium
    fontWeight: 600,
  },
  itemSubtitle: {
    fontSize: 9,
    color: "#6a6a6a",
    marginTop: 1,
  },
  bulletList: {
    marginTop: 3,
    marginLeft: 10,
  },
  bulletItem: {
    fontSize: 11,
    lineHeight: 1.4,
    marginBottom: 2,
  },

  // ---------- Skills ----------
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },
  skillTag: {
    fontSize: 11,
  },

  // ---------- Projects ----------
  projectContainer: {
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 600,
  },
  projectDescription: {
    fontSize: 11,
    marginTop: 1,
  },
  techStack: {
    fontSize: 10,
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },
});

export function ResumePDF({ data }: { data: GeneratedResume }) {
  // Section Header Component
  const SectionHeader = ({ title }: { title: string }) => (
    <View style={{ marginBottom: 4 }}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>
      <View style={pdfStyles.separator} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* ---------- Header ---------- */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{data.header.fullName}</Text>
          <Text style={pdfStyles.headline}>{data.header.headline}</Text>
          <Text style={pdfStyles.contact}>
            {data.header.location} • {data.header.email} • {data.header.phone}
          </Text>

          {/* Links */}
          <View style={pdfStyles.linksContainer}>
            {(data.header.links || []).map((l, i) => (
              <Link key={i} src={l.url} style={pdfStyles.link}>
                {l.label}
              </Link>
            ))}
          </View>
        </View>

        {/* ---------- Summary ---------- */}
        <View style={pdfStyles.section}>
          <SectionHeader title="SUMMARY" />
          <Text style={pdfStyles.summaryText}>{data.summary}</Text>
        </View>

        {/* ---------- Experience ---------- */}
        <View style={pdfStyles.section}>
          <SectionHeader title="EXPERIENCE" />
          <View>
            {data.experiences?.map((e, i) => (
              <View key={i} style={pdfStyles.itemContainer}>
                <Text style={pdfStyles.itemTitle}>
                  {e.role} • {e.company}
                </Text>
                <Text style={pdfStyles.itemSubtitle}>
                  {e.location ? e.location + " • " : ""}
                  {e.start} – {e.end}
                </Text>

                {/* Bullet Points */}
                <View style={pdfStyles.bulletList}>
                  {(e.bullets || []).slice(0, 6).map((b, j) => (
                    <Text key={j} style={pdfStyles.bulletItem}>
                      • {b}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ---------- Education ---------- */}
        <View style={pdfStyles.section}>
          <SectionHeader title="EDUCATION" />
          <View>
            {data.education?.map((ed, i) => (
              <View key={i} style={pdfStyles.itemContainer}>
                <Text style={pdfStyles.itemTitle}>
                  {ed.degree} • {ed.university}
                </Text>
                <Text style={pdfStyles.itemSubtitle}>{ed.years}</Text>
                {ed.details ? (
                  <Text style={{ fontSize: 11, marginTop: 1 }}>{ed.details}</Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        {/* ---------- Skills ---------- */}
        <View style={pdfStyles.section}>
          <SectionHeader title="SKILLS" />
          <View style={pdfStyles.skillsContainer}>
            {(data.skills || []).map((s, i) => (
              <Text key={i} style={pdfStyles.skillTag}>
                {s}
              </Text>
            ))}
          </View>
        </View>

        {/* ---------- Projects ---------- */}
        {data.projects && data.projects.length > 0 && (
          <View style={pdfStyles.section}>
            <SectionHeader title="PROJECTS" />
            <View>
              {data.projects.map((p, i) => (
                <View key={i} style={pdfStyles.projectContainer}>
                  <Text style={pdfStyles.projectTitle}>{p.name}</Text>
                  <Text style={pdfStyles.projectDescription}>
                    {p.description}
                  </Text>
                  <View style={pdfStyles.skillsContainer}>
                    <Text>Tech Stacks:</Text>
                    {(p.technologies || []).map((tech, idx) => (
                      <Text key={idx} >
                        {tech}
                      </Text>
                    ))}
                  </View>
                  <Link src={p.link} style={{ fontSize: 9, color: "blue", textDecoration: "none" }}>
                    View Project
                  </Link>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}

