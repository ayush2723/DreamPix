import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <div className="flex flex-col gap-2 select-none">
      <h2 className="h2-bold bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="p-16-regular mt-1 font-medium text-foreground/60 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default Header