def filesize(size)
  units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'Pib', 'EiB']

  return '0.0 B' if size == 0
  exp = (Math.log(size) / Math.log(1024)).to_i
  exp += 1 if (size.to_f / 1024 ** exp >= 1024 - 0.05)
  exp = 6 if exp > 6 

  '%.1f %s' % [size.to_f / 1024 ** exp, units[exp]]
end
