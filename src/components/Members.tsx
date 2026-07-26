import { motion } from "framer-motion";
import { domainTeams, executiveRoles } from "../data/content";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3);
}

function PersonCard({ role, name, index }: { role: string; name: string; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07 }}
      data-cursor="card"
      className="glass rounded-2xl px-7 py-8 transition-shadow duration-300 hover:shadow-[0_0_38px_-12px_rgba(56,226,255,0.55)]"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-electric)] to-[var(--color-cyan)] font-[var(--font-display)] text-sm font-semibold text-[var(--color-void)]">
          {initials(name)}
        </div>
        <div className="min-w-0">
          <p className="font-mono-tight text-[11px] uppercase text-[var(--color-cyan)]">{role}</p>
          <h3 className="mt-1 truncate font-[var(--font-display)] text-lg font-medium text-[var(--color-ink)]">
            {name}
          </h3>
        </div>
      </div>
    </motion.article>
  );
}

function DomainCard({ team, index }: { team: (typeof domainTeams)[number]; index: number }) {
  const people = [
    { role: "Lead", name: team.lead },
    { role: "Co-Lead", name: team.coLead },
    ...team.members.map((name) => ({ role: "Member", name })),
  ].filter((person) => person.name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.06 }}
      className="space-y-5"
    >
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-[var(--color-cyan)] shadow-[0_0_18px_rgba(56,226,255,0.8)]" />
        <h3 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
          {team.domain}
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {people.map((person, personIndex) => (
          <PersonCard
            key={`${team.domain}-${person.role}-${person.name}`}
            role={person.role}
            name={person.name}
            index={personIndex}
          />
        ))}
      </div>
    </motion.article>
  );
}

export default function Members() {
  return (
    <section id="members" className="relative px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="font-mono-tight text-xs uppercase text-[var(--color-electric)]">Core team</span>
          <h2 className="mt-4 font-[var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            The people <span className="text-gradient">running the lab</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-mist)]">
            Executive roles first, followed by every domain team in order.
          </p>
        </motion.div>

        <div className="mt-16">
          <h3 className="font-mono-tight text-xs uppercase tracking-[0.24em] text-[var(--color-cyan)]">
            Executive roles
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {executiveRoles.map((member, index) => (
              <PersonCard key={member.role} {...member} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-mono-tight text-xs uppercase tracking-[0.24em] text-[var(--color-cyan)]">
            Domains
          </h3>
          <div className="mt-8 space-y-14">
            {domainTeams.map((team, index) => (
              <DomainCard key={team.domain} team={team} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
